import { useMutation, useQuery } from '@apollo/client';
import { useCallback } from 'react';
import ITodo from '../../models/todo';
import { CREATE_TODO } from '../mutations/createTodo';
import { GET_TODOS } from '../queries/getTodos';

export const useCreateTodoMutation = () => {
    const [createTodo] = useMutation<{newTodo: ITodo}>(CREATE_TODO, {
        refetchQueries: [GET_TODOS]
    });

    return useCallback(
        ({title, description, dueDate}: ITodo) => {
            return createTodo({
                variables: {
                    title,
                    description,
                    dueDate,
                }
            });
        },
        [createTodo]
    );
};