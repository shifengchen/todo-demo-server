const { GraphQLServer } = require("graphql-yoga");
const moment = require("moment");
const { prisma } = require("../generated/prisma-client");

async function main() {
  // Create a new todo
  // const newTodo = await prisma.createTodo({
  //   info: "learn graphql",
  //   deadline: "2020-03-01"
  // });
  // console.log(`Create new todo: ${newTodo.info} (ID: ${newTodo.id})`);

  // Read all
  const allTodoes = (await prisma.todoes()) || [];
  console.log("All todoes", allTodoes);

  // Delete a todo by id
  const deleteTodo = await prisma.deleteTodo({
    id: allTodoes[0] && allTodoes[0].id
  });
}

main().catch(e => console.error(e));

let list = [
  {
    id: "id-0",
    info: "learn graphql",
    deadline: "2020-01-05",
    level: 3,
    done: false,
    createAt: "2020-01-03"
  }
];

let idCount = list.length;

const resolvers = {
  Query: {
    list: () => list
  },
  Mutation: {
    create: (root, args) => {
      const todo = {
        id: `id-${idCount++}`,
        info: args.info,
        deadline: args.deadline,
        level: args.level || 0,
        done: false,
        createAt: moment().format("YYYY-MM-DD")
      };
      list.push(todo);
      return todo;
    }
  },
  Todo: {
    id: root => root.id,
    info: root => root.info,
    deadline: root => root.deadline,
    level: root => root.level,
    done: root => root.done,
    createAt: root => root.createAt
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
