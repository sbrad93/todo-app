import { useQuery } from '@apollo/client';
import ITodo from '../../models/todo';
import { GET_TODOS } from '../queries/getTodos';

export const getTodosQuery = () => {
    return useQuery<{getTodos: ITodo[]}>(GET_TODOS);
  };