const isArrowKey = (key: string) => {
  const [, arrow] = key.match(/Arrow(\w+)$/) || [];
  return arrow;
};

export default isArrowKey;
