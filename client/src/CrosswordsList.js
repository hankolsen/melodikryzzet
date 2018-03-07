import React from 'react';
import List from './List/List';

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
    if (crosswords && crosswords.length) {
      return (
        <div>
          <h1>Choose crossword</h1>
          { <List crosswords={crosswords} /> }
        </div>
      );
    }
    return null;
  }

}

export default CrosswordsList;
