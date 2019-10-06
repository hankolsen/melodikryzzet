import React, { createContext, useContext, useEffect, useState } from 'react';

const initialValue = {};
const CrosswordsListContext = createContext(initialValue);

const useCrosswordsList = () => {
  const context = useContext(CrosswordsListContext);
  if (!context) {
    throw new Error('useCrosswordsList must be used within a CrosswordsListContext');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
const CrossWordsListProvider = ({ children }) => {

  const [crosswords, setCrosswords] = useState([]);

  useEffect(() => {
    fetch('/.netlify/functions/crosswords')
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status.toString());
        }
        return response.json();
      })
      // eslint-disable-next-line no-shadow
      .then(({ crosswords }) => {
        setCrosswords(crosswords);
      })
      .catch((error) => console.log(`Error ${error}`));
  }, []);

  const value = {
    crosswords,
  };

  return (
    <CrosswordsListContext.Provider value={value}>
      { children }
    </CrosswordsListContext.Provider>
  );
};

export { CrossWordsListProvider, useCrosswordsList };
