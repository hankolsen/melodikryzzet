import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Crossword from './Crossword/Crossword';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Crossword />
      </div>
    );
  }
}

export default App;
