import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  crossword: {
    id: string;
    name: string;
  };
};

const ListItem = (props: Props) => {
  const {
    crossword: { id, name },
  } = props;

  return (
    <div className="list__list-item">
      <Link className="list-item__button" to={`/crossword/${id}`} key={id}>
        {name}
      </Link>
    </div>
  );
};

export default ListItem;
