const { GraphQLServer } = require("graphql-yoga");
const moment = require("moment");
const { prisma } = require("../generated/prisma-client");

const resolvers = {
  Query: {
    list: (root, args, context, info) => {
      return context.prisma.todoes();
    }
  },
  Mutation: {
    create: (root, args, context) => {
      return context.prisma.createTodo({
        info: args.info,
        deadline: args.deadline,
        level: args.level
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
