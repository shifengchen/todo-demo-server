const { GraphQLServer } = require("graphql-yoga");
const moment = require("moment");
const { prisma } = require("../generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Todo = require("./resolvers/Todo");

const resolvers = {
  Query,
  Mutation,
  User,
  Todo
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
