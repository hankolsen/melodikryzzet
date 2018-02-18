import React from 'react';
import { Link } from 'react-router-dom';

class CrosswordsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      crosswords: [],
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL)
      .then(response => response.json())
      .then(({ crosswords }) => {
        this.setState({ crosswords });
      });
  }

  render() {
    const { crosswords } = this.state;
    return (
      <div>
        <h1>Choose crossword</h1>
        { crosswords.map(({ name, id }) => <Link to={`/crossword/${id}`} key={id}>{name}</Link>) }
      </div>
    );
  }

}

export default CrosswordsList;
