const isArrowKey = (key: string) => {
  const [, arrow] = key.match(/Arrow(\w+)$/) || [];
  return Boolean(arrow);
};

export default isArrowKey;
