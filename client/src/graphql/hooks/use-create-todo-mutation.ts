import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { CreateTodoVariables } from '../typings/create-todo-variables';
import { CREATE_TODO } from '../mutations/createTodo';
import { GET_TODOS } from '../queries/getTodos';

export const useCreateTodoMutation = () => {
    const [createTodo] = useMutation<{newTodo: CreateTodoVariables}>(CREATE_TODO, {
        refetchQueries: [GET_TODOS]
    });

    return useCallback(
        ({title, description, dueDate}: CreateTodoVariables) => {
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