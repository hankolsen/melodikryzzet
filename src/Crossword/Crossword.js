/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';

import './Crossword.css';
import { Redirect } from 'react-router-dom';
import Separators from '../Separators/Separators';
import Cells from '../Cells/Cells';
import CellInput from '../Cells/CellInput';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import {
  cellContainsOtherDirection, createCrossword, cellIsStartingWord,
  deselectAll, emptyAll, getCurrentId,
  getInputPosition, highlightId, isIgnorableKey, isValidKey, toggleDirection,
} from './crosswordHelper';

class Crossword extends React.Component {

  constructor(props) {
    super(props);

    this.separators = [];
    this.numberOfColumns = 0;
    this.numberOfRows = 0;
    this.inputWidth = 0;
    this.inputHeight = 0;
    this.boardWidth = 0;
    this.boardHeight = 0;

    this.state = {
      isLoading: true,
      direction: 'across',
      error: false,
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.inputClickHandler = this.inputClickHandler.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.crosswordId = match.params.id;
    createCrossword(this.crosswordId)
      .then(({ name, cells, separators, numberOfColumns, numberOfRows, boardWidth, boardHeight, inputWidth, inputHeight }) => {

        Object.assign(this, { name, separators, numberOfColumns, numberOfRows, boardWidth, boardHeight, inputWidth, inputHeight });

        this.setState({ cells });
      })
      .catch(() => {
        this.setState({ error: true });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  reset() {
    localStorage.removeItem(`kryzz-${this.crosswordId}`);
    const { cells } = this.state;
    emptyAll(cells);
    this.setState({ cells });
  }

  highlightCurrentSelection({ direction }) {
    const { cells, currentCell, selection } = this.state;
    return new Promise((resolve) => {
      const id = getCurrentId({ currentCell, direction, selection });
      this.cellInput.focus();
      if (id) {
        highlightId({ cells, direction, id, currentCell });
      }
      this.setState({ direction, selection: id }, () => resolve({ direction }));
    });
  }


  clickHandler(event, row, column) {
    let { direction } = this.state;
    const { cells } = this.state;
    const currentCell = cells[row][column];
    if (currentCell.number
        && !currentCell.highlighted
        && !cellIsStartingWord({ cell: currentCell, direction })
        && cellContainsOtherDirection({ currentCell, direction })
        && cellIsStartingWord({ cell: currentCell, direction: toggleDirection(direction) })) {
      direction = toggleDirection(direction);
    }
    if (!currentCell[direction] || currentCell.selected) {
      direction = toggleDirection(direction);
    }
    this.setState({ currentCell }, () => {
      this.highlightCurrentSelection({ direction })
        .then(({ direction: newDirection }) => {
          this.setState({ cells, direction: newDirection, currentCell });
        });
    });
  }


  inputClickHandler() {
    let { direction, currentCell } = this.state;
    const { cells, selection } = this.state;

    if (currentCell) {
      if (cellContainsOtherDirection({ currentCell, direction })) {
        direction = toggleDirection(direction);
        this.highlightCurrentSelection({ direction });
      } else if (currentCell[direction].length > 1) {
        const currentIndex = currentCell[direction].indexOf(selection);
        const nextIndex = (currentIndex + 1) % currentCell[direction].length;
        const newId = currentCell[direction][nextIndex];
        highlightId({ cells, direction, id: newId, currentCell });
        this.setState({ cells, selection: newId });
      }
    } else {
      currentCell = cells[0][0]; // eslint-disable-line prefer-destructuring
      if (!currentCell[direction]) {
        direction = toggleDirection(direction);
      }
      this.setState({ currentCell, direction }, () => {
        this.highlightCurrentSelection({ direction });
      });
    }
  }


  handleArrowMove({ arrow }) {
    const { cells, currentCell } = this.state;
    const { row, column } = currentCell;

    /* eslint-disable no-shadow */
    const moves = {
      Left: (cells, row, column) => cells[row][column - 1],
      Right: (cells, row, column) => cells[row][column + 1],
      Up: (cells, row, column) => cells[row - 1] && cells[row - 1][column],
      Down: (cells, row, column) => cells[row + 1] && cells[row + 1][column],
    };
    /* eslint-enable no-shadow */

    const newCell = moves[arrow](cells, row, column);
    if (newCell) {
      this.moveTo(newCell);
    }
  }

  inputHandler(event) {
    const { currentCell } = this.state;
    const key = event.target.value;
    if (isValidKey(key)) {
      currentCell.text = key.toUpperCase();
      this.setState({ currentCell });
      this.moveToNext();
    }
  }

  keyUpHandler(event) {
    const { key } = event;

    if (key === 'Shift' || event.metaKey) {
      return;
    }


    // Is it an arrow key?
    const [, arrow] = key.match(/Arrow(\w+)$/) || [];


    if (arrow) {
      this.handleArrowMove({ arrow });
    }


    if (isIgnorableKey(key)) {
      event.preventDefault();
      return;
    }

    if (key === 'Backspace') {
      const { currentCell } = this.state;
      if (currentCell.text) {
        currentCell.text = '';
        this.setState({ currentCell });
      } else {
        this.moveToPrevious();
      }
    }

    const { cells } = this.state;
    const entries = cells.map((row) => row.map((cell) => cell && cell.text));
    localStorage.setItem(`kryzz-${this.crosswordId}`, JSON.stringify(entries));

  }

  moveTo(nextCell) {
    const { cells } = this.state;
    let { direction, selection } = this.state;
    if (!nextCell[direction] || !nextCell[direction].includes(selection)) {
      direction = toggleDirection(direction);
      if (!nextCell[direction] || !nextCell[direction].length) {
        direction = toggleDirection(direction);
      }
      [selection] = nextCell[direction];
    }
    highlightId({ cells, direction, id: selection, currentCell: nextCell });
    this.setState({ cells, selection, currentCell: nextCell, direction });
    this.cellInput.focus();
  }

  moveToPrevious() {
    this.moveToNext(-1);
  }


  moveToNext(dir = 1) {
    const { direction, cells, selection } = this.state;
    const array = [];

    cells
      .map((row) => row.forEach((cell) => {
        if (cell && cell[direction] && cell[direction].includes(selection)) {
          array.push(cell);
        }
      }));

    let nextCell;
    const currentIndex = array.findIndex((cell) => cell.selected);
    if (currentIndex > -1 && currentIndex < array.length) {
      const nextIndex = currentIndex + dir;
      nextCell = array[nextIndex];
    }

    if (nextCell) {
      deselectAll(cells);
      nextCell.selected = true;
      this.setState({ currentCell: nextCell, cells });
      this.cellInput.focus();
    }

  }

  renderCrossword() {
    const { cells, currentCell = {} } = this.state;
    const { left, top } = getInputPosition(currentCell);
    return (
      <div className="crossword-board">
        <svg className="crossword__grid" viewBox={`0 0 ${this.boardWidth} ${this.boardHeight}`} fill="#222222">
          <rect x="0" y="0" width={this.boardWidth} height={this.boardHeight} className="crossword__grid-background" />
          { cells && <Cells cells={cells} clickHandler={this.clickHandler} /> }
          <Separators separators={this.separators} />
        </svg>
        <CellInput
          top={top}
          left={left}
          width={this.inputWidth}
          height={this.inputHeight}
          inputHandler={this.inputHandler}
          keyUpHandler={this.keyUpHandler}
          clickHandler={this.inputClickHandler}
          ref={(input) => { this.cellInput = input; }}
        />
      </div>
    );
  }

  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div className="crossword">
        <h3>{this.name ? this.name : 'Loading crossword' }</h3>
        <div className="crossword-container">
          { isLoading ? <LoadingIndicator /> : this.renderCrossword() }
        </div>
        <button onClick={this.reset} type="submit" className={isLoading ? 'hidden' : ''}>Reset</button>
      </div>
    );
  }
}

Crossword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};


export default Crossword;
