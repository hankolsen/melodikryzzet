import { type CellType, Direction } from '$lib/types';
import { moveToPrevious } from '$lib/utils/move';

type Props = {
	currentCell: CellType;
	direction: Direction;
	cells: CellType[][];
	selection: string;
};

export const handleBackspaceKey = ({ currentCell, cells, direction, selection }: Props) => {
	if (currentCell.text) {
		currentCell.text = '';
	} else {
		currentCell = moveToPrevious({
			currentCell,
			direction,
			cells,
			selection
		});
	}

	return currentCell;
};
