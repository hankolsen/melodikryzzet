type Entry = {
	id: string;
	direction: Direction;
	group: string[];
	length: number;
	position: { x: number; y: number };
	separatorLocations?: { [key: string]: number[] };
	turns?: number[];
};

export type CrosswordCollection = {
	name: string;
	size: {
		width: number;
		height: number;
	};
	entries: Entry[];
	slug: string;
};

////////////////////////

export enum Direction {
	across = 'across',
	down = 'down'
}

export type Position = { x: number; y: number };

export type SeparatorType = {
	direction: Direction;
	position: Position;
	separator: string;
	locations: number[];
	id: string;
};

export type CrosswordResponse = {
	crossword: {
		entries: Entry[];
		name: string;
		size: { width: number; height: number };
	};
};

export type CellType = {
	[direction in Direction]: string[];
} & {
	column: number;
	number?: number;
	row: number;
	highlighted?: boolean;
	selected?: boolean;
	text?: string;
	arrow?: string;
};

export type CrosswordType = {
	name: string;
	cells: CellType[][];
	separators?: SeparatorType[];
	numberOfColumns: number;
	numberOfRows: number;
	boardWidth: number;
	boardHeight: number;
	inputWidth: number;
	inputHeight: number;
	crosswordId: string;
};

/*export type CrosswordState = {
	crossword?: CrosswordType;
	showInput: boolean;
	currentCell: CellType;
	selection: string;
	direction: Direction;
};*/

export type CrosswordContextType = {
	boardWidth: number;
	boardHeight: number;
	cells: CellType[][];
	crosswordId: string;
	currentCell: CellType;
	inputWidth: number;
	inputHeight: number;
	name?: string;
	numberOfColumns?: number;
	numberOfRows?: number;
	selection?: string;
	separators?: SeparatorType[];
	showInput: boolean;
};
