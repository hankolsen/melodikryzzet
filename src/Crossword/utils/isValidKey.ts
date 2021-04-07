const isValidKey = (key: string) => key.match(/^[a-zåäö]{1}$/i) || key === 'Backspace';

export default isValidKey;
