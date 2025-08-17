import { type CellType, Direction } from '$lib/types';
import { deHighlightAll } from '$lib/utils/deHighlightAll';
import { deSelectAll } from '$lib/utils/deSelectAll';
import { highlightSelection } from '$lib/utils/highlightSelection';

export const highlightCurrentSelection = ({
	cells,
	currentCell,
	direction,
	id
}: {
	cells: CellType[][];
	currentCell: CellType;
	direction: Direction;
	id?: string;
}) => {
	if (id) {
		deHighlightAll(cells);
		deSelectAll(cells);
		currentCell.selected = true;
		highlightSelection(cells, direction, id);
	}
};
