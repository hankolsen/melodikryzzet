import { isValidKey } from '$lib/utils/isValidKey';

// TODO: Tab does not end up here...
export const isIgnorableKey = (key: string) => key === 'Tab' || key === 'Shift' || !isValidKey(key);
