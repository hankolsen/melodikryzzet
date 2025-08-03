import type { CellType, Direction } from '$lib/types';
import { deSelectAll } from '$lib/utils/deSelectAll';
import { deHighlightAll } from '$lib/utils/deHighlightAll';

type Props = {
	cells: CellType[][];
	direction: Direction;
	id: string;
	currentCell: CellType;
};
export const highlightId = ({ cells, direction, id, currentCell }: Props) => {
	deSelectAll(cells);
	deHighlightAll(cells);
	currentCell.selected = true;

	cells.map((row) =>
		row.forEach((cell) => {
			if (cell && cell[direction] && cell[direction].includes(id)) {
				cell.highlighted = true;
			}
		})
	);
};
