const isValidKey = (key: string) => Boolean(key.match(/^[a-zåäö]{1}$/i) || key === 'Backspace');

export default isValidKey;
