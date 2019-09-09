import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as resolvers from './src/resolvers';

(async () => {
  const schema = await buildSchema({
    resolvers: Object.values(resolvers),
    emitSchemaFile: true,
  });

  const server = new GraphQLServer({
    schema,
  });

  server.start({
    port: 4000,
    endpoint: '/',
    subscriptions: '/',
    playground: '/',
  }, ({ port }) => console.log(`Server is running on http://localhost:${port}`));
})()
