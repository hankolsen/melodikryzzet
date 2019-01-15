import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Crossword from './Crossword/Crossword';
import CrosswordsList from './CrosswordsList';


const App = () => (
  <div className="App">
    <header>
      <h1 className="header__title">
        <Link to="/" className="header__home-link">Melodi<span>kryzzet</span></Link>
      </h1>
    </header>
    <div className="content">
      <Switch>
        <Route exact path="/" component={CrosswordsList} />
        <Redirect from="/crossword/" to="/" exact />
        <Route path="/crossword/:id" component={Crossword} />
        <Route component={CrosswordsList} />
      </Switch>
    </div>
  </div>
);


export default App;
