const { generatePassword } = require('../utils/passwordUtils');
const { User } = require('../../database/models');

const login = async (req, res) => {
  console.log('login has been sucesfull');
  console.log(req.session);
  return res.send('POST: /login');
};

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const { hash, salt } = generatePassword(password);
  console.log(hash, salt);
  try {
    let userExists = await User.findOne({ where: { email } });
    console.log('USER EXISTS', userExists);
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
    return res.send('User created Succesfully');
  } catch (error) {
    console.log(error);
    res.send('Something went wrong');
  }
};

module.exports = {
  login,
  register,
};
