import { CellType, CrosswordType, Direction } from './Crossword.types';

export type CrosswordState = {
  crossword?: CrosswordType;
  showInput: boolean;
  currentCell: CellType;
  selection: string;
  direction: Direction;
};

export type CrosswordAction =
  | { type: 'click_cell'; row: number; column: number }
  | { type: 'click_input' }
  | { type: 'on_input'; event: React.KeyboardEvent<HTMLInputElement> }
  | { type: 'key_up'; event: React.KeyboardEvent<HTMLInputElement> }
  | { type: 'reset' }
  | { type: 'crossword_loaded'; crossword: CrosswordType };
