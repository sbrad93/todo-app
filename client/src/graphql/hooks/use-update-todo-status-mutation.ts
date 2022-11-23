import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import ITodo from '../../models/todo';
import { UPDATE_TODO } from '../mutations/updateTodo';
import { GET_TODOS } from '../queries/getTodos';
import { UpdateTodoStatusVariables } from '../typings/update-status-todo-variables';

export const useUpdateTodoStatusMutation = () => {
    const [updateTodo] = useMutation<{updated: ITodo}>(UPDATE_TODO, {
        refetchQueries: [GET_TODOS]
    });

    return useCallback(
        ({id, isCompleted}: UpdateTodoStatusVariables) => {
            return updateTodo({
                variables: {
                    id,
                    isCompleted
                }
            });
        },
        [updateTodo]
    );
};