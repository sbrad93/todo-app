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
  dueDate: Date;

  @Field()
  userID: string;
}

// Input type for creating new todo
@InputType()
export class CreateTodo implements Partial<Todo> {
  @Field()
  title: string

  @Field({ nullable: true }) 
  description?: string

  @Field()
  dueDate: Date;
}