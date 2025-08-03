import { describe, expect, it } from 'vitest';
import { isValidKey } from '$lib/utils/isValidKey';

describe('isValidKey test', () => {
  it('should consider letters and backspace as valid', () => {
    expect(isValidKey('a')).toBe(true);
    expect(isValidKey('A')).toBe(true);
    expect(isValidKey('Backspace')).toBe(true);
    expect(isValidKey('å')).toBe(true);
    expect(isValidKey('z')).toBe(true);

    expect(isValidKey('1')).toBe(false);
    expect(isValidKey('!')).toBe(false);
    expect(isValidKey('.')).toBe(false);
    expect(isValidKey('asdg')).toBe(false);
    expect(isValidKey('345')).toBe(false);
  });
});
