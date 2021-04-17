/* istanbul ignore file */
import React from 'react';
import { AxiosError } from 'axios';

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

type Entry = {
  id: string;
  direction: Direction;
  group: string[];
  length: number;
  position: { x: number; y: number };
  separatorLocations?: { [key: string]: number[] };
  turns?: number[];
};

export type CrosswordResponse = {
  crossword: {
    entries: Entry[];
    name: string;
    size: { width: number; height: number };
    _id: string;
  };
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

export type CrosswordContextType = {
  boardWidth: number;
  boardHeight: number;
  clickHandler: (row: number, column: number) => void;
  cells?: CellType[][];
  crosswordId: string;
  currentCell: CellType;
  inputWidth: number;
  inputHeight: number;
  isLoading: boolean;
  name?: string;
  numberOfColumns?: number;
  numberOfRows?: number;
  inputClickHandler: () => void;
  inputHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  separators?: SeparatorType[];
  showInput: boolean;
  error?: AxiosError;
};
