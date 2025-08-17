import type { CellType } from '$lib/types';

export const deHighlightAll = (cells?: CellType[][]) => {
	if (!cells) {
		return;
	}
	cells.forEach((row) =>
		row.forEach((cell) => {
			if (cell) {
				cell.highlighted = false;
			}
		})
	);
};
