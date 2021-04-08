import React from 'react';
import ListItem from './ListItem';
import './List.css';

type Props = {
  crosswords: {
    id: string;
    name: string;
  }[];
};

const List = ({ crosswords }: Props) => (
  <div className="list">
    {crosswords.map((crossword) => (
      <ListItem crossword={crossword} key={crossword.id} />
    ))}
  </div>
);

export default List;
