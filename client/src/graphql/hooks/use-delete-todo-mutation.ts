import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import ITodo from '../../models/todo';
import { DELETE_TODO } from '../mutations/deleteTodo';
import { GET_TODOS } from '../queries/getTodos';
import { DeleteTodoVariables } from '../typings/delete-todo-variables';

export const useDeleteTodoMutation = () => {
    const [removeTodo] = useMutation<{removed: ITodo}>(DELETE_TODO, {
        refetchQueries: [GET_TODOS]
    });

    return useCallback(
        ({id}: DeleteTodoVariables) => {
            return removeTodo({
                variables: {
                    id
                }
            });
        },
        [removeTodo]
    );
};