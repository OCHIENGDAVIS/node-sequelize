const express = require('express');
const passport = require('passport');

const {
  register,
  getAllUser,
  getCurrentUser,
  logOutUser,
  login,
} = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllUser);
router.get(
  '/current-user',
  passport.authenticate('jwt', { session: false }),
  getCurrentUser
);
router.get('/logout', logOutUser);

// Passport local strategy route
// router.post(
//   '/login',
//   passport.authenticate('local', { successRedirect: '/auth/current-user' })
// );

router.post('/login', login);
router.post('/register', register);

module.exports = router;
