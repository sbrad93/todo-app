import ITodo from "../../models/todo";

export interface CreateTodoVariables {
    title: ITodo["title"];
    description: ITodo["description"];
    dueDate: ITodo["dueDate"];
}