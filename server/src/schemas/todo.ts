import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export class Todo {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  isCompleted: boolean;

  @Field()
  dueDate: string;

  @Field()
  userID: string;
}

// Input type for creating new todo
@InputType()
export class CreateTodo implements Partial<Todo> {
  @Field()
  title: string;

  @Field({ nullable: true }) 
  description?: string;

  @Field()
  dueDate: string;
}

// Input type for deleting a todo
@InputType()
export class DeleteTodo implements Partial<Todo> {
  @Field()
  id: string;
}

// Input type for updating a todo
@InputType()
export class UpdateTodo implements Partial<Todo> {
  @Field()
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  dueDate?: string;

  @Field({ nullable: true })
  isCompleted?: boolean;
}