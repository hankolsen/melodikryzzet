import { CellType, Direction } from './Crossword.types';
import {
  cellIsStartingWord,
  cellContainsOtherDirection,
  cellIsStartingWordInOtherDirection,
  getCurrentId,
} from './crosswordHelper';
import { CrosswordType } from './utils/createCrossword';
import deHighlightAll from './utils/deHighlightAll';
import highlightSelection from './utils/highLightSelection';

type CrosswordState = {
  crossword?: CrosswordType;
  isLoading: boolean;
  showInput: boolean;
  currentCell: CellType;
  selection: string;
  direction: Direction;
};

type CrosswordAction =
  | { type: 'click_cell'; row: number; column: number }
  | { type: 'click_input' }
  | { type: 'crossword_loaded'; crossword: CrosswordType }
  | { type: 'crossword_load_failed'; err: any }
  | { type: 'load' };

// eslint-disable-next-line no-confusing-arrow
const toggleDirection = (direction: Direction) =>
  direction === Direction.across ? Direction.down : Direction.across;

const highlightCurrentSelection = ({
  cells,
  currentCell,
  direction,
  id,
}: {
  cells: CellType[][];
  currentCell: CellType;
  direction: Direction;
  id?: string;
}) => {
  if (id) {
    deHighlightAll(cells);
    currentCell.selected = true;
    highlightSelection(cells, direction, id);
  }
};

const crosswordReducer = (
  state: CrosswordState,
  action: CrosswordAction,
): CrosswordState => {
  const { crossword, selection } = state;
  const { cells = [[]] } = crossword ?? {};
  let { direction, currentCell } = state;
  switch (action.type) {
    case 'click_input': {
      if (currentCell) {
        if (cellContainsOtherDirection({ currentCell, direction })) {
          direction = toggleDirection(direction);
          const id = getCurrentId({ currentCell, direction, selection });
          highlightCurrentSelection({ cells, currentCell, direction, id });
          return { ...state, selection: id, direction };
        }

        if (currentCell[direction].length > 1) {
          const currentIndex = currentCell[direction].indexOf(selection);
          const nextIndex = (currentIndex + 1) % currentCell[direction].length;
          const newId = currentCell[direction][nextIndex];
          highlightCurrentSelection({
            cells,
            currentCell,
            direction,
            id: newId,
          });
          return {
            ...state,
            selection: newId,
          };
        }
      } else {
        // eslint-disable-next-line prefer-destructuring
        currentCell = cells[0][0];
        if (!currentCell[direction]) {
          direction = toggleDirection(direction);
        }
        const id = getCurrentId({ currentCell, direction, selection });
        highlightCurrentSelection({ cells, currentCell, direction, id });
        return {
          ...state,
          direction,
          selection: id,
          currentCell,
        };
      }
      return state;
    }
    case 'click_cell': {
      const { row, column } = action;
      const currentCell = cells[row][column];

      if (
        currentCell.number &&
        !currentCell.highlighted &&
        !cellIsStartingWord({ cell: currentCell, direction }) &&
        cellContainsOtherDirection({ currentCell, direction }) &&
        cellIsStartingWordInOtherDirection({
          cell: currentCell,
          direction,
        })
      ) {
        direction = toggleDirection(direction);
      }

      if (!currentCell[direction] || currentCell.selected) {
        direction = toggleDirection(direction);
      }

      const id = getCurrentId({
        currentCell,
        direction,
        selection: state.selection,
      });

      highlightCurrentSelection({ cells, currentCell, direction, id });

      return {
        ...state,
        selection: id,
        direction,
        showInput: true,
        currentCell,
      };
    }
    case 'load':
      return { ...state, isLoading: true };
    case 'crossword_loaded':
      return {
        ...state,
        isLoading: false,
        crossword: action.crossword,
      };
    case 'crossword_load_failed':
      return {
        ...state,
        isLoading: false,
        crossword: undefined,
      };
    default:
      return state;
  }
};

export default crosswordReducer;
