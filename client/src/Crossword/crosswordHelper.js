import {CELL_HEIGHT, CELL_WIDTH} from "../config";

let boardHeight;
let boardWidth;
let numberOfColumns;

const dehighlightAll = (cells) => {
  cells.forEach(row => row.forEach((cell) => {
    if (cell) {
      cell.highlighted = false;
    }
  }));
};

const deselectAll = (cells) => {
  cells.forEach(row => row.forEach((cell) => {
    if (cell) {
      cell.selected = false;
    }
  }));
};

const emptyAll = (cells) => {
  cells.map(row =>
    row.forEach((column) => {
      if (column) {
        column.text = '';
      }
    }));
};

const fillCell = ({cells, row, column, index, number, id, direction, text}) => {
  cells[row][column] = {
    ...cells[row][column],
    text,
    number: index === 0 ? number : cells[row][column] && cells[row][column].number,
    [direction]: id,
  };
};

const createCrossword = () => new Promise((resolve, reject) =>
  fetch(process.env.REACT_APP_API_URL)
    .then(response => response.json())
    .then(({crosswordData}) => {
      numberOfColumns = crosswordData.size.width;
      const numberOfRows = crosswordData.size.height;
      let separators = [];

      const cells = Array(numberOfRows).fill()
        .map(() => Array(numberOfColumns).fill());

      const data = JSON.parse(localStorage.getItem('kryzz') || 'null');

      crosswordData.entries.forEach(({id, direction, position, length, number, separatorLocations}) => {
        if (direction === 'across') {
          const row = position.y;
          Array(length)
            .fill()
            .map((_, i) => position.x + i)
            .map((column, index) =>
              fillCell({cells, row, column, index, number, id, direction, text: data && data[row][column]}));
        } else {
          const column = position.x;
          Array(length)
            .fill()
            .map((_, i) => position.y + i)
            .map((row, index) =>
              fillCell({cells, row, column, index, number, id, direction, text: data && data[row][column]}));
        }
        Object.entries(separatorLocations).forEach(([separator, locations]) => {
          if (locations && locations.length) {
            separators.push({direction, position, separator, locations, id});
          }
        });
      });

      const inputWidth = 100 / numberOfColumns;
      const inputHeight = 100 / numberOfRows;
      boardWidth  = (CELL_WIDTH * numberOfColumns) + numberOfColumns + 1 || 0;
      boardHeight = (CELL_HEIGHT * numberOfRows) + numberOfRows + 1 || 0;
      resolve({ cells, separators, numberOfColumns, numberOfRows, boardWidth, boardHeight, inputWidth, inputHeight });
  })
);

const getInputPosition = ({ row, column }) => {
  const top = ((row * CELL_HEIGHT) + 2) / boardHeight * 100;
  const left = (column / numberOfColumns) * 100;
  return { left, top };
};

const isValidKey = key => key.match(/^[a-zåäö]{1}$/i) || key === 'Backspace';

const isIgnorableKey = key => key === 'Tab' || !isValidKey(key);


const highlightCurrentSelection = ({ cells, cellInput, direction, currentCell }) => {
  let id = currentCell[direction];
  cellInput.focus();
  deselectAll(cells);
  dehighlightAll(cells);
  currentCell.selected = true;
  if (!id) {
    direction = toggleDirection(direction);
    id = currentCell[direction];
  }
  if (id) {
    if (direction === 'across') {
      cells
        .map(row => row.filter(cell => cell && cell[direction] === id))
        .filter(arr => arr.length)[0].forEach((cell) => {
        cell.highlighted = true;
      });
    } else {
      cells
        .map(row => row.filter(cell => cell && cell[direction] === id))
        .filter(arr => arr.length).forEach((arr) => {
        arr[0].highlighted = true;
      });
    }
  }
  return direction;
};

const toggleDirection = (direction) => {
  return direction === 'across' ? 'down' : 'across';
};

export { createCrossword, deselectAll, emptyAll, getInputPosition, highlightCurrentSelection, isIgnorableKey, toggleDirection };
