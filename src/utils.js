const crypto = require('crypto')
const algorithm = 'aes-192-cbc';
const PASSWORD = ''
const APP_SECRET = "455c87018c9d80acc0c86b0694c5941926d2074fa1d84611f68658e749bd7d8f";

function hash(password) {
  const hmac = crypto.createHmac('sha256', APP_SECRET);
  return hmac.update(password).digest('hex');
}

function compare(inputPassword, userPassword) {
  return hash(inputPassword) === userPassword;
}

function sign(id) {
  const key = crypto.scryptSync(PASSWORD, APP_SECRET, 24)
  const iv = Buffer.alloc(16, 0); // 初始化向量。
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = '';
  cipher.on('readable', () => {
    let chunk;
    while (null !== (chunk = cipher.read())) {
      encrypted += chunk.toString('hex');
    }
  });
  cipher.on('end', () => {
    console.log('token', encrypted);
  });

  cipher.write(id);
  cipher.end();
  return encrypted
}

function verify(token) {
  const key = crypto.scryptSync(PASSWORD, APP_SECRET, 24)
  const iv = Buffer.alloc(16, 0); // 初始化向量。

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = '';
  decipher.on('readable', () => {
    while (null !== (chunk = decipher.read())) {
      decrypted += chunk.toString('utf8');
    }
  });
  decipher.on('end', () => {
    console.log('userId', decrypted);
  });

  // 使用相同的算法、密钥和 iv 进行加密。
  const encrypted = token;
  decipher.write(encrypted, 'hex');
  decipher.end();
  return decrypted
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
  hash,
  compare,
  sign,
  verify
};
