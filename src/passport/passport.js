const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const { User } = require('../../database/models');
const {
  generatePassword,
  validatePassword,
} = require('../utils/passwordUtils');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'User not found!' }); // tell passport that there is no error and also there is no user
    }
    const IsValidPassword = validatePassword(
      password,
      user.password,
      user.salt
    );
    if (!IsValidPassword) {
      return done(null, false, { message: 'Wrong Password' });
    }
    return done(null, user, { message: 'Logedin successfully' });
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      done(null, user);
    }
  } catch (error) {
    done(error);
  }
});
