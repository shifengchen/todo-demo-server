const { getUserId } = require("../utils");

// function list(root, args, context, info) {
//   const userId = getUserId(context);
//   return context.prisma.todoes({
//     where: {
//       createBy: {
//         id: userId
//       }
//     }
//   });
// }

function list(root, args, context, info) {
  return context.prisma.todoes()
}

module.exports = {
  list
};
