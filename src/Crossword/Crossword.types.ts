/* istanbul ignore file */
export type CellType = {
  [direction in Direction]: string[];
} & {
  column: number;
  number: number;
  row: number;
  highlighted?: boolean;
  selected?: boolean;
  text?: string;
  arrow?: string;
};

export enum Direction {
  across = 'across',
  down = 'down',
}

export type Selection = {};

export type Position = { x: number; y: number };

export type SeparatorType = {
  direction: Direction;
  position: Position;
  separator: string;
  locations: number[];
  id: string;
};

export type CrosswordListItem = {
  name: string;
  id: string;
};

export type CrosswordListResponse = {
  crosswords: CrosswordListItem[];
};
