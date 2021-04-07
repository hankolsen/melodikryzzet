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

export type Selection = {

};
