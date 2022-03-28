const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const { User } = require('../../database/models');
const {
  generatePassword,
  validatePassword,
} = require('../utils/passwordUtils');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRETE,
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

const JWT = new JWTStrategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.sub } });
    if (user) {
      done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
});
passport.use(JWT);
