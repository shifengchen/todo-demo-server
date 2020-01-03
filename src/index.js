const { GraphQLServer } = require('graphql-yoga')
const moment = require('moment')

let list =[{
  id: 'id-0',
  info: 'learn graphql',
  deadline: '2020-01-05',
  level: 3,
  done: false,
  createAt: '2020-01-03'
}]

let idCount = list.length

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
        createAt: moment().format('YYYY-MM-DD')
      }
      list.push(todo)
      return todo
    }
  },
  Todo: {
    id: (root) => root.id,
    info: (root) => root.info,
    deadline: (root) => root.deadline,
    level: (root) => root.level,
    done: (root) => root.done,
    createAt: (root) => root.createAt,
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
