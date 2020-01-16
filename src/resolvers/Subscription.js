function newTodoSubscribe(root, args, context, info) {
  return context.prisma.$subscribe.todo({
    mutation_in: ['CREATED', 'UPDATED', 'DELETED']
  }).node()
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
