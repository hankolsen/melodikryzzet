import isValidKey from './isValidKey';

// TODO: Tab does not end up here...
const isIgnorableKey = (key: string) => key === 'Tab' || key === 'Shift' || !isValidKey(key);

export default isIgnorableKey;
