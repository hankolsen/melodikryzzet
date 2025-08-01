import { type CellType, Direction } from '$lib/types';

export const highlightSelection = (cells: CellType[][], direction: Direction, id: string) => {
	cells.map((row) =>
		row.forEach((cell) => {
			if (cell && cell[direction] && cell[direction].includes(id)) {
				cell.highlighted = true;
			}
		})
	);
};
