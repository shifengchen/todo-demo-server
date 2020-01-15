function newTodoSubscribe(root, args, context, info) {
  return context.prisma.$subscribe.todo({ mutation_in: ['CREATED'] }).node()
}

const newTodo = {
  subscribe: newTodoSubscribe,
  resolve: payload => {
    return payload
  },
}

module.exports = {
  newTodo,
}
