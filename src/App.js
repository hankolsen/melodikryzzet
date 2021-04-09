import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Crossword from './Crossword/Crossword';
import { CrosswordProvider } from './Crossword/CrosswordContext';
import CrosswordsListView from './CrosswordsList/CrosswordsListView';

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
          <Route
            path="/crossword/:crosswordId"
            component={() => (
              <CrosswordProvider>
                <Crossword />
              </CrosswordProvider>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </QueryClientProvider>
    </div>
  </div>
);

export default App;
