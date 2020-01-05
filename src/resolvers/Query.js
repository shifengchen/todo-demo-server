const { getUserId } = require("../utils");

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
  list
};
