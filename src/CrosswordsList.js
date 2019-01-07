import React from 'react';
import List from './List/List';
import LoadingIndicator from './LoadingIndicator/LoadingIndicator';

class CrosswordsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      crosswords: [],
    };
  }

  componentDidMount() {
    fetch('/.netlify/functions/crosswords')
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(({ crosswords }) => {
        this.setState({ crosswords });
      })
      .catch(error => console.log(`Error ${error}`));
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
    return (
      <div>
        <h1>Loading crosswords</h1>
        <div className="list" >
          <LoadingIndicator />
        </div>
      </div>
    );
  }

}

export default CrosswordsList;
