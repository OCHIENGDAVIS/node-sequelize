const jsonwentoken = require('jsonwebtoken');

const issueJwt = (user) => {
  const id = user.id;
  const expiresIn = '1d';
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = jsonwentoken.sign(payload, process.env.JWT_SECRETE, {
    expiresIn,
  });
  return { token: `Bearer ${signedToken}`, expiresIn };
};

module.exports = {
  issueJwt,
};
