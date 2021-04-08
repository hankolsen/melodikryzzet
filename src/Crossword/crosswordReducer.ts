import { CellType, Direction } from './Crossword.types';
import { CrosswordType } from './utils/createCrossword';
import deSelectAll from './utils/deSelectAll';
import emptyAll from './utils/emptyAll';
import highlightCurrentSelection from './utils/highlightCurrentSelection';
import isArrowKey from './utils/isArrowKey';
import isIgnorableKey from './utils/isIgnorableKey';
import isValidKey from './utils/isValidKey';
import getCurrentId from './utils/getCurrentId';
import cellIsStartingWord from './utils/cellIsStartingWord';
import { moveToNext } from './utils/move';
import toggleDirection from './utils/toggleDirection';
import cellContainsOtherDirection from './utils/cellContainsOtherDirection';
import cellIsStartingWordInOtherDirection from './utils/cellIsStartingWordInOtherDirection';

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
  | { type: 'on_input'; event: React.KeyboardEvent<HTMLInputElement> }
  | { type: 'key_up'; event: React.KeyboardEvent<HTMLInputElement> }
  | { type: 'reset' }
  | { type: 'crossword_loaded'; crossword: CrosswordType }
  | { type: 'crossword_load_failed'; err: any }
  | { type: 'load' };

const crosswordReducer = (
  state: CrosswordState,
  action: CrosswordAction,
): CrosswordState => {
  const { crossword, selection } = state;
  const { cells = [[]], crosswordId } = crossword ?? {};
  let { direction, currentCell } = state;
  switch (action.type) {
    case 'reset': {
      if (crosswordId !== undefined) {
        localStorage.removeItem(`kryzz-${crosswordId}`);
      }
      emptyAll(cells);
      return { ...state, crossword };
    }
    case 'key_up': {
      const { event } = action;
      const { key, metaKey } = event;
      if (isIgnorableKey(key) || metaKey) {
        event.preventDefault();
        return state;
      }

      if (isArrowKey(key)) {
        return state;
      }

      return state;
    }
    case 'on_input': {
      const { value } = action.event.target as HTMLInputElement;
      if (!isValidKey(value)) {
        return state;
      }

      currentCell.text = value.toUpperCase();
      const nextCell = moveToNext({
        cells,
        direction,
        selection,
        currentCell,
      });
      deSelectAll(cells);
      nextCell.selected = true;
      return {
        ...state,
        crossword,
        currentCell: nextCell,
      };
    }
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
        crossword,
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
