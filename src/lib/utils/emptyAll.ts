import type { CellType } from '$lib/types';

const emptyAll = (cells: CellType[][]) => {
	cells.map((row) =>
		row.forEach((column) => {
			if (column) {
				column.text = '';
			}
		})
	);
};

export default emptyAll;
