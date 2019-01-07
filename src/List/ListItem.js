import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListItem = (props) => {
  const { id, name } = props.crossword;

  return (
    <div className="list__list-item">
      <Link className="list-item__button" to={`/crossword/${id}`} key={id}>{name}</Link>
    </div>
  );
};

ListItem.propTypes = {
  crossword: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListItem;
