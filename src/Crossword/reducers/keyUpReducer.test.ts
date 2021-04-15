import keyUpReducer from './keyUpReducer';
import { CrosswordState } from '../crosswordReducer.types';
import handleArrowKey from './handleArrowKey';
import handleBackspaceKey from './handleBackspaceKey';
import { CellType, Direction } from '../Crossword.types';
import { CrosswordType } from '../utils/createCrossword';

jest.mock('./handleArrowKey');
const mockHandleArrowKey = handleArrowKey as jest.Mock;

jest.mock('./handleBackspaceKey');
const mockHandleBackspaceKey = handleBackspaceKey as jest.Mock;

describe('keyUpReducer test', () => {
  it('should ignore Shift key and meta keys', () => {
    const state = {} as CrosswordState;
    const event: React.KeyboardEvent<HTMLInputElement> = {
      key: 'Shift',
    } as React.KeyboardEvent<HTMLInputElement>;
    expect(keyUpReducer(state, event)).toStrictEqual(state);

    event.key = 'z';
    event.metaKey = true;
    expect(keyUpReducer(state, event)).toStrictEqual(state);
    expect(mockHandleArrowKey).not.toHaveBeenCalled();
    expect(mockHandleBackspaceKey).not.toHaveBeenCalled();
  });

  it('should handle arrow keys', () => {
    const state = {} as CrosswordState;
    const event: React.KeyboardEvent<HTMLInputElement> = {
      key: 'ArrowRight',
    } as React.KeyboardEvent<HTMLInputElement>;
    keyUpReducer(state, event);
    expect(mockHandleArrowKey).toHaveBeenCalledTimes(1);
    expect(mockHandleArrowKey).toHaveBeenCalledWith({ state, arrow: 'Right' });
    expect(mockHandleBackspaceKey).not.toHaveBeenCalled();
  });

  it('should handle backspace key', () => {
    const state = {} as CrosswordState;
    const event: React.KeyboardEvent<HTMLInputElement> = {
      key: 'Backspace',
    } as React.KeyboardEvent<HTMLInputElement>;
    mockHandleBackspaceKey.mockReturnValue({});
    keyUpReducer(state, event);
    expect(mockHandleBackspaceKey).toHaveBeenCalledTimes(1);
    expect(mockHandleArrowKey).not.toHaveBeenCalled();
  });

  it('should handle letter key', () => {
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
        crosswordId: 'abc',
        cells: [[firstCell, secondCell]],
      } as CrosswordType,
      direction: Direction.across,
      selection: '1-across',
      currentCell: firstCell,
    } as CrosswordState;

    const event: React.KeyboardEvent<HTMLInputElement> = {
      key: 'a',
    } as React.KeyboardEvent<HTMLInputElement>;

    const setItemSpy = jest.spyOn(global.Storage.prototype, 'setItem');

    keyUpReducer(state, event);
    expect(mockHandleBackspaceKey).not.toHaveBeenCalled();
    expect(mockHandleArrowKey).not.toHaveBeenCalled();
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith('kryzz-abc', '[["",""]]');
  });
});
