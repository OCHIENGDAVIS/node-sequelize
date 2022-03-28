const {
  generatePassword,
  validatePassword,
} = require('../utils/passwordUtils');
const { User } = require('../../database/models');
const { issueJwt } = require('../utils/jwtUtils');

const getAllUser = async (req, res) => {
  console.log(req.session);
  res.send('all users');
};

const getCurrentUser = (req, res) => {
  return res.json({ user: req.user, msg: 'sucess' });
};

const logOutUser = (req, res) => {
  req.logout();
  console.log(req.session);
  return res.json({ msg: 'Logged out' });
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.json({ msg: 'Could not find user' });
    }
    const isValidPassword = validatePassword(
      req.body.password,
      user.password,
      user.salt
    );
    if (!isValidPassword) {
      return res.json({ msg: 'invalid password' });
    }
    const { token, expiresIn } = issueJwt(user);

    return res.json({ token, expiresIn, msg: 'sucess' });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const { hash, salt } = generatePassword(password);
  console.log(hash, salt);
  try {
    let userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.send('User with that email already exists');
    }
    const user = new User({
      firstname,
      lastname,
      email,
      salt,
      password: hash,
    });
    const savedUser = await user.save();
    console.log(savedUser);
    const { token, expiresIn } = issueJwt(savedUser);
    return res.json({ token, expiresIn, msg: 'sucess' });
  } catch (error) {
    console.log(error);
    res.send('Something went wrong');
  }
};

module.exports = {
  login,
  register,
  getAllUser,
  getCurrentUser,
  logOutUser,
};
