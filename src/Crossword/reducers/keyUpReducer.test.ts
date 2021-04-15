import keyUpReducer from './keyUpReducer';
import { CrosswordState } from '../crosswordReducer.types';
import handleArrowKey from './handleArrowKey';
import handleBackspaceKey from './handleBackspaceKey';

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
    const state = ({
      crossword: {
        // Add cell(s) with text here to add test coverage
        cells: [[{ text: 'A' }, { text: '' }]],
      },
    } as unknown) as CrosswordState;
    const event: React.KeyboardEvent<HTMLInputElement> = {
      key: 'Backspace',
    } as React.KeyboardEvent<HTMLInputElement>;
    mockHandleBackspaceKey.mockReturnValue({});
    keyUpReducer(state, event);
    expect(mockHandleBackspaceKey).toHaveBeenCalledTimes(1);
    expect(mockHandleArrowKey).not.toHaveBeenCalled();
  });

  it('should handle ignorable key', () => {
    const state = {} as CrosswordState;
    const mockPreventDefault = jest.fn();
    const event: React.KeyboardEvent<HTMLInputElement> = ({
      key: '!',
      preventDefault: mockPreventDefault,
    } as unknown) as React.KeyboardEvent<HTMLInputElement>;

    expect(keyUpReducer(state, event)).toStrictEqual(state);
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockHandleBackspaceKey).not.toHaveBeenCalled();
    expect(mockHandleArrowKey).not.toHaveBeenCalled();
  });

  it('should handle normal key', () => {
    const state = {} as CrosswordState;
    const event: React.KeyboardEvent<HTMLInputElement> = {
      key: 'a',
    } as React.KeyboardEvent<HTMLInputElement>;

    expect(keyUpReducer(state, event)).toStrictEqual(state);
    expect(mockHandleBackspaceKey).not.toHaveBeenCalled();
    expect(mockHandleArrowKey).not.toHaveBeenCalled();
  });
});
