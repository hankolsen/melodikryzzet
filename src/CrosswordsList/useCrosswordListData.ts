/* istanbul ignore file */
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { CrosswordListResponse } from 'Crossword/Crossword.types';

const useCrosswordListData = () => {
  const { isLoading, error, data } = useQuery('crosswordsList', () =>
    axios.get<CrosswordListResponse>('/.netlify/functions/crosswords'),
  );

  const { crosswords } = data?.data ?? {};
  return {
    isLoading,
    error: error as AxiosError,
    crosswords,
  };
};

export default useCrosswordListData;
