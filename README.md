# ts-gql-lambda

Getting started with GraphQL and TypeScript using TypeGraphQL - [https://pusher.com/tutorials/graphql-typescript](https://pusher.com/tutorials/graphql-typescript)

## Getting Started

Clone the project repository by running the command below if you use SSH

```bash
$ git clone git@github.com:viniciusflv/ts-gql-lambda.git
```

If you use https, use this instead

```bash
$ git clone https://github.com/viniciusflv/ts-gql-lambda.git
```

After cloning, to install the dependencies, run:

```bash
$ npm i
```

#### Then you'll have two options

Start the serverless with:
* PS: Currently is broken due a schema redundancy issue
* Go to handler.ts and switch the **GraphQLServerLambda** constructor options from **schema** to **typeDefs** and **resolvers**. Make sure to comment the imported **resolvers** and the **buildSchema**
```bash
$ npm start
```

Start the server with:

```bash
$ npm run dev
```

Which runs ``npm run buiild`` and ``npm run serve``

#### Both cases the server will be running on [http://localhost:4000](http://localhost:4000).

## Built With

* [TypeGraphQL](https://19majkel94.github.io/type-graphql) - Modern framework for GraphQL API in Node.js
* [graphql-yoga](https://github.com/prisma/graphql-yoga) - Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience
* [TypeScript](https://www.typescriptlang.org) - A typed superset of JavaScript that compiles to clean JavaScript
* [Serverless](https://serverless.com) - Build apps with radically less overhead and cost
