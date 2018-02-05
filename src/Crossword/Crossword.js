import React from 'react';
import './Crossword.css';
import Cell from '../Cell/Cell.js';
import entries from '../entries';

class Crossword extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.cellWidth = 30;
    this.cellHeight = 30;
    this.boardWidth = 11;
    this.boardHeight = 10;

    this.state = {
      direction: 'across',
      cells: Array(this.boardHeight).fill().map(_ => Array(this.boardWidth).fill())
    };

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

    entries.forEach(({id, direction, position, length, number}) => {
      if (direction === 'across') {
        const row = position.y;
        Array(length).fill().map((_, i) => position.x + i).map((column, index) => this.fillCell({cells, row, column, index, number, id, direction}));
      } else {
        const column = position.x;
        Array(length).fill().map((_, i) => position.y + i).map((row, index) => this.fillCell({cells, row, column, index, number, id, direction}));
      }
    });

    this.setState({ cells });
  }

  clickHandler = (event, row, column) => {
    let direction = this.state.direction;
    let id = this.state.cells[row][column][direction];
    const cells = Object.assign([], this.state.cells);
    cells.forEach(row => row.forEach(cell => {
      if (cell) {
        cell.highlighted = false;
        cell.selected = false;
      }
    }));
    cells[row][column].selected = true;
    if (!id) {
      direction = direction === 'across' ? 'down': 'across';
      id = this.state.cells[row][column][direction];
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

    this.setState({ cells, direction });
  };

  render () {

    const rectWidth = (this.cellWidth + 1) * this.boardWidth + 1;
    const rectHeight = (this.cellHeight + 1) * this.boardHeight + 1;

    return (
      <div className="crossword">
        <div className="crossword-container">
          <div className="crossword-board">
            <svg className="crossword__grid" viewBox={`0 0 ${rectWidth} ${rectHeight}`}>
              <rect x="0" y="0" width={rectWidth} height={rectHeight} className="crossword__grid-background" />
              { this.state.cells
                  .map((row, y) => row
                    .map((cell, x) => cell &&
                      <Cell key={`${y + 1}-${x + 1}`} row={y} column={x} number={cell.number} letter={cell.text} highlighted={cell.highlighted} selected={cell.selected} clickHandler={this.clickHandler} />))
              }
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default Crossword;