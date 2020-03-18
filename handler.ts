import { GraphQLServerLambda } from 'graphql-yoga';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as resolvers from './src/resolvers';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { getMetadataStorage } from "type-graphql/dist/metadata/getMetadataStorage";

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
    // "Fix" for decorators schema redundancy issue
    if (process.env.IS_OFFLINE) {
      getMetadataStorage().clear();
    }
    return new GraphQLServerLambda({ schema })
  }
}

const handler = new Handler();

export const server = (
  e: APIGatewayProxyEvent,
  ctx: Context,
  cb: Callback
) => {
  ctx.callbackWaitsForEmptyEventLoop = true;
  handler.lambda.then((lambda) => lambda.graphqlHandler(e, ctx, cb));
};

export const playground = (
  e: APIGatewayProxyEvent,
  ctx: Context,
  cb: Callback
) => {
  ctx.callbackWaitsForEmptyEventLoop = true;
  handler.lambda.then((lambda) => lambda.playgroundHandler(e, ctx, cb));
};
