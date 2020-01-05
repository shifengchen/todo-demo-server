function createBy(root, args, context) {
  return context.prisma.todo({ id: root.id }).createBy();
}

module.exports = {
  createBy
};
