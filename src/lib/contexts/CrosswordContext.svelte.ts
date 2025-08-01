import { getContext, setContext } from 'svelte';
import {
	type CellType,
	type CrosswordContextType,
	type CrosswordType,
	Direction,
	type SeparatorType
} from '$lib/types';

const KEY = Symbol('CrosswordContext');

export const createCrosswordContext = (crossword: CrosswordContextType) => {
	setContext<CrosswordContext>(KEY, new CrosswordContext(crossword));
};

export const getCrosswordContext = () => {
	return getContext<CrosswordContext>(KEY);
};

class CrosswordContext {
	crossword?: CrosswordType = $state(undefined);
	showInput: boolean = $state(false);
	currentCell: CellType = $state({ row: 0, column: 0 } as CellType);
	selection: string = $state('');
	direction: Direction = $state(Direction.across);
	boardWidth: number = $state(0);
	boardHeight: number = $state(0);
	cells: CellType[][] = $state([]);
	crosswordId: string = $state('');
	inputWidth: number = $state(0);
	inputHeight: number = $state(0);
	name: string = $state('');
	numberOfColumns: number = $state(0);
	numberOfRows: number = $state(0);
	separators?: SeparatorType[] = $state([]);

	position: { left: number; top: number } = $derived.by(() => {
		const { row = 0, column = 0 } = this.currentCell;
		const top = (row / this.numberOfRows) * 100 || 0; // (((row * CELL_HEIGHT) + 2) / boardHeight) * 100 || 0;
		const left = (column / this.numberOfColumns) * 100 || 0;
		return { left, top };
	});

	constructor(crossword: CrosswordContextType) {
		const {
			cells,
			numberOfColumns,
			numberOfRows,
			boardWidth = 0,
			boardHeight = 0,
			inputWidth = 0,
			inputHeight = 0,
			name,
			separators
		} = crossword;

		this.cells = cells;
		this.numberOfColumns = numberOfColumns ?? 0;
		this.numberOfRows = numberOfRows ?? 0;
		this.boardWidth = boardWidth;
		this.boardHeight = boardHeight;
		this.inputWidth = inputWidth;
		this.inputHeight = inputHeight;
		this.name = name ?? '';
		this.separators = separators;
	}
}
