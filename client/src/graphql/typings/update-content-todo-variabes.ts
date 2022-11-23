import ITodo from "../../models/todo";

export interface UpdateTodoContentVariables {
    id: ITodo["id"];
    title: ITodo['title'];
    dueDate: ITodo['dueDate'];
}