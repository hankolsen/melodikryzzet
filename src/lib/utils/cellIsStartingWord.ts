import { type CellType, Direction } from '$lib/types';

type Props = {
	cell: CellType;
	direction: Direction;
};

export const cellIsStartingWord = ({ cell, direction }: Props) =>
	Boolean(
		cell &&
			cell.number &&
			cell[direction] &&
			cell[direction].find((id) => id.startsWith(cell.number!.toString()))
	);
