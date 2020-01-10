const { getUserId } = require("../utils");

function todo(root, args, context, info) {
  return context.prisma.todo({ id: args.id })
}

function list(root, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.todoes({
    where: {
      createBy: {
        id: userId
      }
    }
  });
}

module.exports = {
  list,
  todo
};
