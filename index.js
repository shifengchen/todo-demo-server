const { GraphQLServer } = require("graphql-yoga");

let list =[{
  id: 'id-0',
  info: 'learn graphql',
  deadline: '2020-01-05',
  level: 3,
  done: false,
  createAt: '2020-01-03'
}]

const typeDefs = `
  type Query {
    list: [Todo!]!
  }

  type Todo {
    id: ID!
    info: String!
    deadline: String!
    level: Int!
    done: Boolean!
    createAt: String
  }
`;

const resolvers = {
  Query: {
    list: () => list
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
