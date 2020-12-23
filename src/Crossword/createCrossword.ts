import { CELL_HEIGHT, CELL_WIDTH } from '../config';
import { CellType } from './Crossword.types';
import { toggleDirection } from './crosswordHelper';
import fillCell from './fillCell';

type Entry = {
  id: string;
  direction: 'across' | 'down';
  group: string[];
  length: number;
  position: { x: number; y: number };
  separatorLocations?: { [key: string]: number[] };
  turns?: number[];
};

export type CrosswordType = {
  name: string;
  cells: CellType[][];
  separators?: unknown[];
  numberOfColumns: number;
  numberOfRows: number;
  boardWidth: number;
  boardHeight: number;
  inputWidth: number;
  inputHeight: number;
};

type CrosswordResponse = {
  crossword: {
    entries: Entry[];
    name: string;
    size: { width: number; height: number };
    _id: string;
  };
};

const createCrossword = (crosswordId: string): Promise<CrosswordType> =>
  new Promise((resolve, reject) =>
    fetch(`/.netlify/functions/crosswords/${crosswordId}`)
      .then((response) => response.json())
      .then(({ crossword }: CrosswordResponse) => {
        if (!crossword) {
          reject();
        }
        const numberOfColumns = crossword.size.width;
        const numberOfRows = crossword.size.height;
        const separators: unknown[] = [];

        const cells = Array(numberOfRows)
          .fill(null)
          .map(() => Array(numberOfColumns).fill(null));

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
        const boardWidth =
          CELL_WIDTH * numberOfColumns + numberOfColumns + 1 || 0;
        const boardHeight = CELL_HEIGHT * numberOfRows + numberOfRows + 1 || 0;
        const { name } = crossword;
        console.log('cells', cells);
        // eslint-disable-next-line max-len
        resolve({
          name,
          cells,
          separators,
          numberOfColumns,
          numberOfRows,
          boardWidth,
          boardHeight,
          inputWidth,
          inputHeight,
        });
      })
      .catch((e) => reject(e)),
  );

export default createCrossword;
