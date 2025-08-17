import { type CellType, Direction } from '$lib/types';
import { moveTo } from '$lib/utils/move';

type Props = {
	arrow: string;
	row: number;
	column: number;
	cells: CellType[][];
	direction: Direction;
	selection: string;
};

export const handleArrowKey = ({ arrow, cells, row, column, direction, selection }: Props) => {
	const moves: {
		[arrow: string]: (cells: CellType[][], row: number, column: number) => CellType;
	} = {
		Left: (cells: CellType[][], row: number, column: number) => cells[row][column - 1],
		Right: (cells: CellType[][], row: number, column: number) => cells[row][column + 1],
		Up: (cells: CellType[][], row: number, column: number) =>
			cells[row - 1] && cells[row - 1][column],
		Down: (cells: CellType[][], row: number, column: number) =>
			cells[row + 1] && cells[row + 1][column]
	};

	if (!moves[arrow]) {
		return;
	}

	const newCell: CellType = moves[arrow](cells, row, column);

	if (newCell) {
		return moveTo({ nextCell: newCell, cells, selection, direction });
	}

	return;
};
