import { type CellType, Direction } from '$lib/types';

type Props = {
	currentCell: CellType;
	direction: Direction;
};

export const cellContainsOtherDirection = ({ currentCell, direction }: Props) =>
	Boolean(
		(direction === Direction.across && currentCell.down?.length) ||
		(direction === Direction.down && currentCell.across?.length)
	);
