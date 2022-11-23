import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import ITodo from '../../models/todo';
import { UPDATE_TODO } from '../mutations/updateTodo';
import { GET_TODOS } from '../queries/getTodos';
import { UpdateTodoContentVariables } from '../typings/update-content-todo-variabes';

export const useUpdateTodoContentMutation = () => {
    const [updateTodo] = useMutation<{updated: ITodo}>(UPDATE_TODO, {
        refetchQueries: [GET_TODOS]
    });

    return useCallback(
        ({id, title, description, dueDate}: UpdateTodoContentVariables) => {
            return updateTodo({
                variables: {
                    id,
                    title,
                    description,
                    dueDate
                }
            });
        },
        [updateTodo]
    );
};