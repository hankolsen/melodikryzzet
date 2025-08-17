import type { CellType } from '$lib/types';

export const deSelectAll = (cells?: CellType[][]) => {
	if (!cells) {
		return;
	}
	cells.forEach((row) =>
		row.forEach((cell) => {
			if (cell) {
				cell.selected = false;
			}
		})
	);
};
