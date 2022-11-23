import { gql } from '@apollo/client';

export const UPDATE_TODO = gql`
    mutation UpdateTodoStatus ($id: String! $title: String $description: String $dueDate: String $isCompleted: Boolean) {
        updateTodo (
            input: {
                id: $id
                title: $title
                description: $description
                dueDate: $dueDate
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