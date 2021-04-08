export type CellType = {
  [direction in Direction]: string[];
} & {
  column: number;
  number: number;
  row: number;
  highlighted?: boolean;
  selected?: boolean;
  text?: string;
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
