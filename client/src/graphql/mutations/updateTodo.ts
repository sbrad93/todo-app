import { gql } from '@apollo/client';

export const UPDATE_TODO_STATUS = gql`
    mutation UpdateTodoStatus ($id: String! $isCompleted: Boolean) {
        updateTodo (
            input: {
                id: $id
                isCompleted: $isCompleted
            }
        ) {
            id,
            title,
            description,
            dueDate,
            isCompleted,
            userID
        }
    }`;