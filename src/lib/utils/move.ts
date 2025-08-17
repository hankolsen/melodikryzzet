import { type CellType, Direction } from '$lib/types';
import { toggleDirection } from '$lib/components/cells/toggleDirection';
import { highlightId } from '$lib/utils/hightlightId';

type Props = {
	direction: Direction;
	cells: CellType[][];
	selection: string;
	currentCell: CellType;
};
type InternalProps = Props & { dir: number };

export const moveToNext = ({ direction, cells, selection, currentCell }: Props) =>
	move({ direction, cells, selection, currentCell, dir: 1 });

export const moveToPrevious = ({ direction, cells, selection, currentCell }: Props) =>
	move({ direction, cells, selection, currentCell, dir: -1 });

const move = ({ direction, cells, selection, currentCell, dir }: InternalProps) => {
	const array: CellType[] = [];

	cells.map((row) =>
		row.forEach((cell) => {
			if (cell && cell[direction] && cell[direction].includes(selection)) {
				array.push(cell);
			}
		})
	);

	let nextCell = currentCell;
	const currentIndex = array.findIndex((cell) => cell.selected);
	if (currentIndex + dir > -1 && currentIndex + dir < array.length) {
		const nextIndex = currentIndex + dir;
		nextCell = array[nextIndex];
	}

	return nextCell;
};

type MoveToProps = {
	cells: CellType[][];
	direction: Direction;
	selection: string;
	nextCell: CellType;
};
export const moveTo = ({ cells, direction, selection, nextCell }: MoveToProps) => {
	if (!nextCell[direction] || !nextCell[direction].includes(selection)) {
		direction = toggleDirection(direction);
		if (!nextCell[direction] || !nextCell[direction].length) {
			direction = toggleDirection(direction);
		}
		[selection] = nextCell[direction];
	}
	highlightId({ cells, direction, id: selection, currentCell: nextCell });
	return { cells, selection, currentCell: nextCell, direction };
};
