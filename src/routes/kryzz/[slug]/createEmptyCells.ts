export const createEmptyCells = (numberOfRows: number, numberOfColumns: number) =>
	Array(numberOfRows)
		.fill(null)
		.map(() => Array(numberOfColumns).fill(null));
