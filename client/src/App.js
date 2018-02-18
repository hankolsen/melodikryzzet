import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Crossword from './Crossword/Crossword';
import CrosswordsList from './CrosswordsList';


const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={CrosswordsList} />
      <Redirect from="/crossword/" to="/" exact />
      <Route path="/crossword/:id" component={Crossword} />
      <Route component={CrosswordsList} />
    </Switch>
  </div>
);


export default App;
