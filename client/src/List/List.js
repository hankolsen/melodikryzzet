import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './List.css';

const List = (props) => {
  const { crosswords } = props;

  return (
    <div className="list">
      { crosswords.map(crossword => <ListItem crossword={crossword} key={crossword.id} />) }
    </div>
  );
};

List.propTypes = {
  crosswords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default List;
