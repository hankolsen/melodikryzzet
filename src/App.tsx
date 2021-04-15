import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CrosswordsListView from './CrosswordsList/CrosswordsListView';
import CrosswordView from './Crossword/CrosswordView';

const queryClient = new QueryClient();

const App = () => (
  <div className="App">
    <header>
      <h1 className="header__title">
        <Link to="/" className="header__home-link">
          Melodi<span>kryzzet</span>
        </Link>
      </h1>
    </header>
    <div className="content">
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route exact path="/" component={CrosswordsListView} />
          <Redirect from="/crossword/" to="/" exact />
          <Route path="/crossword/:crosswordId" component={CrosswordView} />
          <Redirect to="/" />
        </Switch>
      </QueryClientProvider>
    </div>
  </div>
);

export default App;
