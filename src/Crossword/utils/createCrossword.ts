import { CELL_HEIGHT, CELL_WIDTH } from '../../config';
import { CrosswordResponse, SeparatorType } from '../Crossword.types';
import fillCell from './fillCell';
import toggleDirection from './toggleDirection';
import createEmptyCells from './createEmptyCells';

type Props = {
  crossword: CrosswordResponse['crossword'];
  crosswordId: string;
};
const createCrossword = ({ crossword, crosswordId }: Props) => {
  const { width: numberOfColumns, height: numberOfRows } = crossword.size;
  const separators: SeparatorType[] = [];

  const cells = createEmptyCells(numberOfRows, numberOfColumns);

  const userData = JSON.parse(
    localStorage.getItem(`kryzz-${crosswordId}`) || 'null',
  );

  crossword.entries.sort(
    (a, b) => a.position.y - b.position.y || a.position.x - b.position.x,
  );

  let number = 1;
  const numbers: { [key: string]: number } = {};
  crossword.entries.forEach(
    ({ direction, position, length, separatorLocations, turns }) => {
      let column = position.x;
      let row = position.y;
      let walkingDirection = direction;
      let turnIndex = 0;
      if (numbers[`${column},${row}`]) {
        number = numbers[`${column},${row}`];
      }
      const id = `${number}-${direction}`;
      numbers[`${column},${row}`] = number;
      Array(length)
        .fill(null)
        .forEach((_, i) => {
          const text = userData && userData[row][column];
          fillCell({
            cells,
            row,
            column,
            index: i,
            number,
            id,
            direction,
            text,
            hasTurn: turns,
          });

          if (turns && turns.length && turns[turnIndex] - 1 === i) {
            walkingDirection = toggleDirection(walkingDirection);
            cells[row][column].arrow = walkingDirection;
            turnIndex += 1;
          }

          if (walkingDirection === 'across') {
            column += 1;
          } else {
            row += 1;
          }
        });

      Object.entries(separatorLocations || {}).forEach(
        ([separator, locations]) => {
          if (locations && locations.length) {
            separators.push({
              direction,
              position,
              separator,
              locations,
              id,
            });
          }
        },
      );
      number += 1;
    },
  );

  const inputWidth = 100 / numberOfColumns;
  const inputHeight = 100 / numberOfRows;
  const boardWidth = CELL_WIDTH * numberOfColumns + numberOfColumns + 1;
  const boardHeight = CELL_HEIGHT * numberOfRows + numberOfRows + 1;
  const { name } = crossword;

  return {
    crosswordId,
    name,
    cells,
    separators,
    numberOfColumns,
    numberOfRows,
    boardWidth,
    boardHeight,
    inputWidth,
    inputHeight,
  };
};

export default createCrossword;
