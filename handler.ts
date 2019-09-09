import { GraphQLServerLambda } from 'graphql-yoga';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as resolvers from './src/resolvers';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';

// const typeDefs = `
//   type Query {
//     hello(name: String): String
//   }
// `

// const resolvers = {
//   Query: {
//     hello: (_, { name }) => `Hello ${name || 'world'}`,
//   },
// }

class Handler {
  public lambda;

  constructor() {
    this.lambda = this.instanciateLambda();
  }

  private async instanciateLambda() {
    const schema = await buildSchema({
      resolvers: Object.values(resolvers),
      emitSchemaFile: true,
    });
    return new GraphQLServerLambda({
      // typeDefs,
      // resolvers,
      schema,
    })
  }
}

const handler = new Handler();

export const server = async (
  e: APIGatewayProxyEvent,
  ctx: Context,
  cb: Callback
) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  const lambda = await handler.lambda;
  return lambda.graphqlHandler(e, ctx, cb);
};

export const playground = async (
  e: APIGatewayProxyEvent,
  ctx: Context,
  cb: Callback
) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  const lambda = await handler.lambda;
  return lambda.playgroundHandler(e, ctx, cb);
};
