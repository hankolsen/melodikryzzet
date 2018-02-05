import React from 'react';
import './Crossword.css';
import Cell from '../Cell/Cell.js';
import Separator from '../Separator/Separator.js';
import entries from '../entries';

class Crossword extends React.Component {
  constructor(props) {
    super(props);
    this.cellWidth = 31;
    this.cellHeight = 31;
    this.boardWidth = 11;
    this.boardHeight = 10;
    this.separators = [];

    this.state = {
      direction: 'across',
      cells: Array(this.boardHeight).fill().map(_ => Array(this.boardWidth).fill()),
      top: -100,
      left: -100,
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  fillCell({ cells, row, column, index, number, id, direction }) {
    cells[row][column] = {
      ...cells[row][column],
      text: '',
      number: index === 0 ? number : cells[row][column] && cells[row][column].number,
      [direction]: id,
    };
  }

  componentDidMount() {

    const cells = this.state.cells;

    entries.forEach(({id, direction, position, length, number, separatorLocations}) => {
      if (direction === 'across') {
        const row = position.y;
        Array(length).fill().map((_, i) => position.x + i).map((column, index) => this.fillCell({cells, row, column, index, number, id, direction}));
      } else {
        const column = position.x;
        Array(length).fill().map((_, i) => position.y + i).map((row, index) => this.fillCell({cells, row, column, index, number, id, direction}));
      }
      if (separatorLocations[','].length) {
        this.separators.push({ direction, position, separatorLocations});
      }
    });

    ['click', 'touchstart'].forEach(eventListener => {
      this.cellInput.addEventListener(eventListener, (e) => {
        let { direction, currentCell } = this.state;
        direction = this.toggleDirection(direction);
        direction = this.highlightCurrentSelection({ direction, currentCell });
        this.setState({ direction });
      });
    });

    this.setState({ cells });
  }

  highlightCurrentSelection({ direction, currentCell }) {
    const { cells } = this.state;
    let id = currentCell[direction];
    this.cellInput.focus();
    this.deselectAll(cells);
    this.dehighlightAll(cells);
    currentCell.selected = true;
    if (!id) {
      direction = this.toggleDirection(direction);
      id = currentCell[direction];
    }
    if (id) {
      if (direction === 'across') {
        cells.map(row => row.filter(cell => cell && cell[direction] === id)).filter(arr => arr.length)[0].forEach(cell => {
          cell.highlighted = true;
        });
      } else {
          cells.map(row => row.filter(cell => cell && cell[direction] === id)).filter(arr => arr.length).forEach(arr => arr[0].highlighted = true);
      }
    }
    return direction;
  }

  toggleDirection(direction) {
    return direction === 'across' ? 'down': 'across';
  }

  deselectAll(cells) {
    cells.forEach(row => row.forEach(cell => {
      if (cell) {
        cell.selected = false;
      }
    }));
  }

  dehighlightAll(cells) {
    cells.forEach(row => row.forEach(cell => {
      if (cell) {
        cell.highlighted = false;
      }
    }));
  }

  clickHandler(event, row, column) {
    let direction = this.state.direction;
    const cells = Object.assign([], this.state.cells);
    const currentCell = cells[row][column];
    if (currentCell.number && !currentCell.highlighted) {
      const regexp = new RegExp(new RegExp(`${currentCell.number}-`))
      const [across, down] = [currentCell.across, currentCell.down].map(dir => dir && dir.match(regexp)) || [];
      if (direction === 'down' && !down) {
        direction = 'across'
      } else if (direction === 'across' && !across) {
        direction = 'down';
      }
    }
    if (currentCell.selected) {
      direction = this.toggleDirection(direction);
    }
    direction = this.highlightCurrentSelection({ direction, currentCell });

    const { left, top } = this.getInputPosition(row, column);

    this.cellInput.focus();

    this.setState({ cells, direction, top, left, currentCell, row, column });
  };

  getInputPosition(row, column) {
    let { top, left } = this.state;
    top = row / this.boardHeight * 100 - row / this.boardHeight / 10;
    left = column / this.boardWidth * 100;
    return { left, top };
  }

  isValidKey(key) {
     return key.match(/^[a-zåäö]{1}$/i);
  }

  isIgnorableKey(key) {
     return key === 'Tab' || (!this.isValidKey(key) && key !== 'Backspace');
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
    const { currentCell } = this.state;

    if (arrow) {
      if (direction === 'across' && (arrow === 'Up' || arrow === 'Down')) {
        direction = this.toggleDirection(direction);
        direction = this.highlightCurrentSelection({ direction, currentCell });
        this.setState({direction}, () => {
          this.handleArrowMove({ arrow, direction });
        });
      } else if (direction === 'down' && (arrow === 'Left' || arrow === 'Right')) {
        direction = this.toggleDirection(direction);
        direction = this.highlightCurrentSelection({ direction, currentCell });
        this.setState({direction}, () => {
          this.handleArrowMove({ arrow, direction });
        });
      } else {
        this.handleArrowMove({ arrow, direction });
      }
    }

    if (this.isIgnorableKey(key)) {
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
        this.setState({currentCell});
      } else {
        this.moveToPrevious();
      }
    } else {
      currentCell.text = event.key.toUpperCase();
      this.setState({currentCell});
      this.moveToNext();
    }

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
      row = Math.max(0, Math.min(row, this.boardHeight - 1))
    }

    currentCell = cells[row][column];
    if (currentCell) {
      this.deselectAll(cells);
      currentCell.selected = true;
      const { left, top } = this.getInputPosition(row, column);
      this.setState({row, column, currentCell, cells, top, left});
      this.cellInput.focus();
    }

  }

  render () {

    const rectWidth = this.cellWidth * this.boardWidth + this.boardWidth + 1;
    const rectHeight = this.cellHeight * this.boardHeight + this.boardHeight + 1;

    return (
      <div className="crossword">
        <div className="crossword-container">
          <div className="crossword-board">
            <svg className="crossword__grid" viewBox={`0 0 ${rectWidth} ${rectHeight}`}>
              <rect x="0" y="0" width={rectWidth} height={rectHeight} className="crossword__grid-background" />
              { this.state.cells
                  .map((row, y) => row
                    .map((cell, x) => cell &&
                      <Cell
                        key={`${y + 1}-${x + 1}`}
                        row={y}
                        column={x}
                        number={cell.number}
                        letter={cell.text}
                        highlighted={cell.highlighted}
                        width={this.cellWidth}
                        height={this.cellHeight}
                        selected={cell.selected}
                        clickHandler={this.clickHandler}
                      />))
              }
              { this.separators.map(({ direction, position, separatorLocations }) =>
                <Separator key={`${position}-${direction}`}
                  direction= {direction}
                  position={position}
                  separatorLocations={separatorLocations}
                  cellWidth={this.cellWidth} />
                )}
            </svg>
            <div className="crossword__hidden-input-wrapper" style={{width: 100/this.boardWidth + '%', height: 100/this.boardWidth + '%', top: this.state.top + '%', left: this.state.left + '%'}}>
              <input
                type="text" maxLength="1" value="" autoComplete="off" spellCheck="false" autoCorrect="off"
                className="crossword__hidden-input"
                onKeyDown={(e) => this.keyDownHandler(e)}
                onKeyUp={(e) => this.keyUpHandler(e)}
                ref={(input) => { this.cellInput = input; }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Crossword;