import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
    mutation CreateTodo ($title: String! $description: String $dueDate: String!) {
        createTodo (
            input: {
                title: $title
                description: $description
                dueDate: $dueDate
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