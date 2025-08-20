import { getContext, setContext } from 'svelte';
import {
	type CellType,
	type CrosswordContextType,
	Direction,
	type SeparatorType
} from '$lib/types';

const KEY = Symbol('CrosswordContext');

export const createCrosswordContext = (crossword: CrosswordContextType) => {
	const context = new CrosswordContext(crossword);
	setContext<CrosswordContext>(KEY, context);
	return context;
};

export const getCrosswordContext = () => {
	return getContext<CrosswordContext>(KEY);
};

class CrosswordContext {
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
	isFull = $derived(this.cells.every((row) => row.every((cell) => (cell ? cell.text : true))));

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
			separators,
			crosswordId
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
		this.crosswordId = crosswordId;
	}
}
