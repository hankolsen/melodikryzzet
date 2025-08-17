export const createEmptyCells = (numberOfRows: number, numberOfColumns: number) =>
	Array.from(Array(numberOfRows)).map(() => Array.from(Array(numberOfColumns)));
