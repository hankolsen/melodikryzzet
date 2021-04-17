import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { CrosswordResponse } from './Crossword.types';

const useSingleCrossword = (crosswordId: string) => {
  const getCrossword = async () => {
    const { data } = await axios.get(
      `/.netlify/functions/crosswords/${crosswordId}`,
    );
    return data;
  };

  return useQuery<CrosswordResponse, AxiosError>(
    ['crossword', crosswordId],
    getCrossword,
  );
};

export default useSingleCrossword;
