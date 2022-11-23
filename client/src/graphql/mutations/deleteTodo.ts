import { gql } from '@apollo/client';

export const DELETE_TODO = gql`
    mutation DeleteTodo ($id: String!) {
        deleteTodo (
            input: {
                id: $id
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