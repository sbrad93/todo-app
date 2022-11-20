import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { Todo, CreateTodo } from '../schemas/Todo'

@Resolver(() => Todo)
export class TodoResolver {
  private todos: Todo[] = [];

  // returns a string for the next avilable id
  getID = (): string => {
    return (this.todos.length+1)+"";
  }

  // returns an array of todos
  @Query(() => [Todo])
  async getTodos(): Promise<Todo[]> {
    return this.todos;
  }

  // returns the new todo
  @Mutation(() => Todo)
  async create (
    @Arg('input') { title, description, dueDate }: CreateTodo
  ): Promise<Todo> {
    const todo = {
      id: this.getID(),
      title,
      description: description ? description : "",
      dueDate,
      isCompleted: false,
      userID: "1",
    }

    this.todos.push(todo);
    return todo;
  }
}