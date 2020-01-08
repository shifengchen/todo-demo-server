const jwt = require("jsonwebtoken");
const { getUserId, hash, compare, sign, verify } = require("../utils");

async function signup(root, args, context, info) {
  const password = await hash(args.password);
  const user = await context.prisma.createUser({ ...args, password });
  const token = sign(user.id);

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

  const valid = compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = sign(user.id);

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

module.exports = {
  signup,
  login,
  create
};
