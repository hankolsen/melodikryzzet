/* eslint-disable no-param-reassign */
import React from 'react';
import './Crossword.css';
import Separators from '../Separators/Separators';
import Cells from '../Cells/Cells';
import CellInput from '../Cells/CellInput';
import {
  cellContainsOtherDirection, createCrossword, cellIsStartingWord,
  deselectAll, emptyAll, getCurrentId,
  getInputPosition, highlightId, isIgnorableKey, toggleDirection,
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
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.inputClickHandler = this.inputClickHandler.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    createCrossword()
      .then(({ cells, separators, numberOfColumns, numberOfRows, boardWidth, boardHeight, inputWidth, inputHeight }) => {

        Object.assign(this, { separators, numberOfColumns, numberOfRows, boardWidth, boardHeight, inputWidth, inputHeight });

        this.setState({ cells });
        setTimeout(() => this.setState({ isLoading: false }), 400);
      });
  }

  reset() {
    localStorage.removeItem('kryzz');
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
    if (currentCell.number &&
        !currentCell.highlighted &&
        !cellIsStartingWord({ cell: currentCell, direction }) &&
        cellContainsOtherDirection({ currentCell, direction }) &&
        cellIsStartingWord({ cell: currentCell, direction: toggleDirection(direction) })) {
      direction = toggleDirection(direction);
    }
    if (!currentCell[direction] || currentCell.selected) {
      direction = toggleDirection(direction);
    }
    this.setState({ currentCell }, () => {
      this.highlightCurrentSelection({ direction })
        .then(({ direction }) => {
          this.setState({ cells, direction, currentCell });
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
      this.setState({ currentCell }, () => {
        this.highlightCurrentSelection({ direction });
      });
    }
  }

  keyUpHandler() {
    // Prevent auto repeat
    this.down = false;
  }

  handleArrowMove({ arrow }) {
    if (arrow === 'Up' || arrow === 'Left') {
      this.moveToPrevious();
    } if (arrow === 'Down' || arrow === 'Right') {
      this.moveToNext();
    }
  }

  keyDownHandler(event) {
    const { key } = event;

    if (key === 'Shift' || event.metaKey) {
      return;
    }

    // Prevent auto repeat
    if (this.down) {
      return;
    }

    this.down = true;


    // Is it an arrow key?
    const [, arrow] = key.match(/Arrow(\w+)$/) || [];

    let { direction } = this.state;
    const { currentCell } = this.state;

    if (arrow) {
      if ((direction === 'across' && (arrow === 'Up' || arrow === 'Down') && currentCell.down) ||
          (direction === 'down' && (arrow === 'Left' || arrow === 'Right') && currentCell.across)) {
        direction = toggleDirection(direction);
        this.highlightCurrentSelection({ direction })
          .then(({ direction }) => {
            this.handleArrowMove({ arrow, direction });
          });
      } else {
        this.handleArrowMove({ arrow, direction });
      }
    }

    if (isIgnorableKey(key)) {
      event.preventDefault();
      return;
    }

    if (key === 'Backspace') {
      if (currentCell.text) {
        currentCell.text = '';
        this.setState({ currentCell });
      } else {
        this.moveToPrevious();
      }
    } else {
      currentCell.text = key.toUpperCase();
      this.setState({ currentCell });
      this.moveToNext();
    }

    const entries = this.state.cells.map(row => row.map(cell => cell && cell.text));
    localStorage.setItem('kryzz', JSON.stringify(entries));

  }


  moveToPrevious() {
    this.moveToNext(-1);
  }


  moveToNext(dir = 1) {
    const { direction, cells, selection } = this.state;
    const array = [];

    cells
      .map(row =>
        row.forEach((cell) => {
          if (cell && cell[direction] && cell[direction].includes(selection)) {
            array.push(cell);
          }
        }));

    let nextCell;
    const currentIndex = array.findIndex(cell => cell.selected);
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

  render() {

    const { cells, currentCell = {}, isLoading } = this.state;
    const { left, top } = getInputPosition(currentCell);

    return (
      <div className="crossword">
        <div className="crossword-container">
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
              keyDownHandler={this.keyDownHandler}
              keyUpHandler={this.keyUpHandler}
              clickHandler={this.inputClickHandler}
              ref={(input) => { this.cellInput = input; }}
            />
          </div>
          <div className={`loading ${isLoading ? '' : 'hide'}`}>
            <h1 className="loading-title">loading</h1>
          </div>
        </div>
        <button onClick={this.reset} className={isLoading ? 'hidden' : ''}>Reset</button>
      </div>
    );
  }
}

export default Crossword;
