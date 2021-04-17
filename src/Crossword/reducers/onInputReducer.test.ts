import onInputReducer from './onInputReducer';
import { CrosswordState } from '../crosswordReducer.types';
import { CellType, CrosswordType, Direction } from '../Crossword.types';

describe('onInputReducer test', () => {
  it('should reject invalid keyboard input', () => {
    const state: CrosswordState = {} as CrosswordState;
    const event = ({
      target: {
        value: '!',
      },
    } as unknown) as React.KeyboardEvent<HTMLInputElement>;
    expect(onInputReducer(state, event)).toStrictEqual({});
  });

  it('should handle keyboard input', () => {
    const setItemSpy = jest.spyOn(global.Storage.prototype, 'setItem');
    const pressedKey = 'a';
    const firstCell: CellType = {
      column: 0,
      row: 0,
      across: ['1-across'],
      down: [],
      highlighted: true,
      selected: true,
      number: 1,
      text: '',
    };
    const secondCell: CellType = {
      column: 1,
      row: 0,
      across: ['1-across'],
      down: [],
      highlighted: true,
      selected: false,
      text: '',
    };
    const state: CrosswordState = {
      crossword: {
        cells: [[firstCell, secondCell]],
        crosswordId: 'abc-123',
      } as CrosswordType,
      direction: Direction.across,
      selection: '1-across',
      currentCell: firstCell,
    } as CrosswordState;
    const event = ({
      target: {
        value: pressedKey,
      },
    } as unknown) as React.KeyboardEvent<HTMLInputElement>;
    expect(onInputReducer(state, event)).toStrictEqual({
      ...state,
      currentCell: {
        ...secondCell,
        selected: true,
      },
    });
    expect(firstCell.text).toBe(pressedKey.toUpperCase());
    expect(firstCell.selected).toBe(false);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(
      'kryzz-abc-123',
      `[["${pressedKey.toUpperCase()}",""]]`,
    );
  });
});
