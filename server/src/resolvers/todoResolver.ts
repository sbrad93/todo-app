import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Todo, CreateTodo, DeleteTodo, UpdateTodo } from '../schemas/Todo';

@Resolver(() => Todo)
export class TodoResolver {
  private todos: Todo[] = [];

  // returns a string for the next avilable id
  private getID = (): string => {
    return (this.todos.length+1)+"";
  }

  // returns an array of todos
  @Query(() => [Todo])
  public async getTodos(): Promise<Todo[]> {
    return this.todos;
  }

  // returns the new todo
  @Mutation(() => Todo)
  public async createTodo (
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

    // returns the deleted todo
    @Mutation(() => Todo)
    public async deleteTodo (
      @Arg('input') { id }: DeleteTodo
    ): Promise<Todo> {
      const remove = this.todos.find((target) => {
        return target.id === id;
      });

      this.todos.splice(this.todos.indexOf(remove), 1);
      return remove;
    }

    // returns the updated todo
    @Mutation(() => Todo)
    public async updateTodo (
      @Arg('input') { id, title, description, dueDate, isCompleted }: UpdateTodo
    ): Promise<Todo> {
      // Find the target todo
      const todo = this.todos.find((target) => {
        return target.id === id;
      });

      // Update the provided attributes
      if (title) {
        todo.title = title;
      }
      if (description) {
        todo.description = description;
      }
      if (dueDate) {
        todo.dueDate = dueDate;
      }
      if (isCompleted) {
        todo.isCompleted = isCompleted;
      }
      return todo;
    }
}