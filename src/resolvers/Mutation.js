const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId, sign } = require("../utils");

async function signup(root, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = sign({ userId: user.id });

  return {
    token,
    user
  };
}

async function login(root, args, context, info) {
  const user = await context.prisma.user({ name: args.name });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = sign({ userId: user.id });

  return {
    token,
    user
  };
}

function create(root, args, context, info) {
  // const userId = getUserId(context);
  return context.prisma.createTodo({
    info: args.info,
    deadline: args.deadline,
    level: args.level,
    // createBy: { connect: { id: userId } }
  });
}

function updateTodo(root, args, context, info) {
  return context.prisma.updateTodo({
    where: { id: args.id },
    data: { info: args.info, deadline: args.deadline, level: args.level }
  })
}

function deleteTodo(root, args, context, info) {
  return context.prisma.deleteTodo({ id: args.id })
}

module.exports = {
  signup,
  login,
  create,
  updateTodo,
  deleteTodo,
};
