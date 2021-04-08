import getArrowKey from './getArrowKey';

describe('getArrowKey test', () => {
  it('should identify arrow keys', () => {
    expect(getArrowKey('a')).toBe(undefined);
    expect(getArrowKey('A')).toBe(undefined);
    expect(getArrowKey('Backspace')).toBe(undefined);
    expect(getArrowKey('Arrow')).toBe(undefined);
    expect(getArrowKey('ArrowUp')).toBeTruthy();
    expect(getArrowKey('ArrowDown')).toBeTruthy();
    expect(getArrowKey('ArrowLeft')).toBeTruthy();
    expect(getArrowKey('ArrowRight')).toBeTruthy();
    expect(getArrowKey('ArrowIn')).toBe(undefined);
  });
});
