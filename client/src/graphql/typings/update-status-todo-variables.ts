import ITodo from "../../models/todo";

export interface UpdateTodoStatusVariables {
    id: ITodo["id"];
    isCompleted: ITodo["isCompleted"];
}