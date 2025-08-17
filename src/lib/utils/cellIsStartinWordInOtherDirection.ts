import { type CellType, Direction } from '$lib/types';
import { cellIsStartingWord } from '$lib/utils/cellIsStartingWord';

type Props = {
	cell: CellType;
	direction: Direction;
};

export const cellIsStartingWordInOtherDirection = ({ cell, direction }: Props) => {
	const otherDirection = direction === Direction.across ? Direction.down : Direction.across;
	return cellIsStartingWord({ cell, direction: otherDirection });
};
