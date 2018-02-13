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
      const boardWidth = crosswordData.size.width;
      const boardHeight = crosswordData.size.height;
      let separators = [];

      const cells = Array(boardHeight).fill()
        .map(() => Array(boardWidth).fill());

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

      resolve({ cells, separators, boardWidth, boardHeight });
  })
);

export default createCrossword;
