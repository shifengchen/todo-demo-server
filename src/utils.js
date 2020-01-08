const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const algorithm = 'aes-192-cbc';
const PASSWORD = ''
const APP_SECRET = "455c87018c9d80acc0c86b0694c5941926d2074fa1d84611f68658e749bd7d8f";

function sign(data) {
  return jwt.sign(data, APP_SECRET)
}

function verify(token) {
  return jwt.verify(token, APP_SECRET)
}

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const userId = verify(token);
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRET,
  getUserId,
  sign,
  verify
};
