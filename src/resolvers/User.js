function list(root, args, context) {
  return context.prisma.user({ id: root.id }).list();
}

module.exports = {
  list
};
