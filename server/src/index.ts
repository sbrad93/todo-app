import Express from 'express';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TodoResolver } from './resolvers/todoResolver';

const init = async() => {
  const app = Express();

  // build the schema
  const schema = await buildSchema({
    resolvers: [TodoResolver],
    emitSchemaFile: true,
  });

  // create the server
  const server = new ApolloServer({
    schema,
  });

  // start the server
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log('Server is running on http://localhost:4000/graphql')
  )
}

init();