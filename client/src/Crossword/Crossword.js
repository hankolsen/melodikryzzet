/* eslint-disable no-param-reassign */
import React from 'react';
import './Crossword.css';
import Separators from '../Separators/Separators';
import Cells from '../Cells/Cells';
import CellInput from '../Cells/CellInput';
import { createCrossword, deselectAll, getInputPosition, highlightCurrentSelection, toggleDirection } from "./crosswordHelper";

class Crossword extends React.Component {

  static isIgnorableKey(key) {
    return key === 'Tab' || (!Crossword.isValidKey(key) && key !== 'Backspace');
  }

  static isValidKey(key) {
    return key.match(/^[a-zåäö]{1}$/i);
  }


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
      top: -100,
      left: -100,
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

        this.setState({cells});
        setTimeout(() => this.setState({isLoading: false}), 400);
      });
  }

  reset() {
    localStorage.removeItem('kryzz');
    const { cells } = this.state;
    cells.map(row =>
      row.forEach((column) => {
        if (column) {
          column.text = '';
        }
      }));
    this.setState({ cells });
  }

  clickHandler(event, row, column) {
    let { direction } = this.state;
    const cells = Object.assign([], this.state.cells);
    const currentCell = cells[row][column];
    if (currentCell.number && !currentCell.highlighted) {
      const regexp = new RegExp(new RegExp(`${currentCell.number}-`));
      const [across, down] = [currentCell.across, currentCell.down].map(dir => dir && dir.match(regexp)) || [];
      if (direction === 'down' && !down) {
        direction = 'across';
      } else if (direction === 'across' && !across) {
        direction = 'down';
      }
    }
    if (currentCell.selected) {
      direction = toggleDirection(direction);
    }
    direction = highlightCurrentSelection({ cells, direction, currentCell, cellInput: this.cellInput });

    const { left, top } = getInputPosition({ row, column} );

    this.setState({ cells, direction, top, left, currentCell, row, column });
  }


  inputClickHandler() {
    let { direction } = this.state;
    const { cells, currentCell } = this.state;
    direction = toggleDirection(direction);
    direction = highlightCurrentSelection({ cells, direction, currentCell, cellInput: this.cellInput });
    this.setState({ direction });
  }

  keyUpHandler() {
    // Prevent auto repeat
    this.down = false;
  }

  handleArrowMove({ arrow, direction }) {
    if ((direction === 'down' && arrow === 'Up') || (direction === 'across' && arrow === 'Left')) {
      this.moveToPrevious();
    } if ((direction === 'down' && arrow === 'Down') || (direction === 'across' && arrow === 'Right')) {
      this.moveToNext();
    }
  }

  keyDownHandler(event) {
    if (event.key === 'Shift') {
      return;
    }
    // Prevent auto repeat
    if (this.down) {
      return;
    }
    this.down = true;

    const { key } = event;

    if (event.metaKey) {
      return;
    }

    // Is it an arrow key?
    const [, arrow] = key.match(/Arrow(\w+)$/) || [];

    let { direction } = this.state;
    const { cells, currentCell } = this.state;

    if (arrow) {
      if (direction === 'across' && (arrow === 'Up' || arrow === 'Down')) {
        direction = toggleDirection(direction);
        direction = highlightCurrentSelection({ cells, direction, currentCell, cellInput: this.cellInput });
        this.setState({ direction }, () => {
          this.handleArrowMove({ arrow, direction });
        });
      } else if (direction === 'down' && (arrow === 'Left' || arrow === 'Right')) {
        direction = toggleDirection(direction);
        direction = highlightCurrentSelection({ cells, direction, currentCell, cellInput: this.cellInput });
        this.setState({ direction }, () => {
          this.handleArrowMove({ arrow, direction });
        });
      } else {
        this.handleArrowMove({ arrow, direction });
      }
    }

    if (Crossword.isIgnorableKey(key)) {
      event.preventDefault();
      return;
    }

    // Ignore Shift key press, all non alfa characters, unless it is tab or backspace
    if ((!key.match(/^[a-zåäö]{1}$/i) && key !== 'Tab' && key !== 'Backspace' && !arrow)) {
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
      currentCell.text = event.key.toUpperCase();
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
    const { direction, cells } = this.state;
    let { currentCell, row, column } = this.state;
    if (direction === 'across') {
      column += dir;
    } else {
      row += dir;
      row = Math.max(0, Math.min(row, this.numberOfRows - 1));
    }

    currentCell = cells[row][column];
    if (currentCell) {
      deselectAll(cells);
      currentCell.selected = true;
      const { left, top } = getInputPosition({ row, column });
      this.setState({ row, column, currentCell, cells, top, left });
      this.cellInput.focus();
    }

  }

  render() {

    const { cells, top, left, isLoading } = this.state;

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
            <div className={`loading ${isLoading ? '' : 'hide'}`}>
              <h1 className="loading-title">loading</h1>
            </div>
          </div>
        </div>
        <button onClick={this.reset} className={isLoading ? 'hidden' : ''}>Reset</button>
      </div>
    );
  }
}

export default Crossword;
