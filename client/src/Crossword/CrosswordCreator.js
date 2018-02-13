import {CELL_HEIGHT, CELL_WIDTH} from "../config";

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
      const numberOfColumns = crosswordData.size.width;
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

      const boardWidth  = (CELL_WIDTH * numberOfColumns) + numberOfColumns + 1 || 0;
      const boardHeight = (CELL_HEIGHT * numberOfRows) + numberOfRows + 1 || 0;
      resolve({ cells, separators, numberOfColumns, numberOfRows, boardWidth, boardHeight });
  })
);

export default createCrossword;
