const express = require('express');
const passport = require('passport');

const { login, register } = require('../controllers/authController');
const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { successRedirect: '/users/current-user' })
);
router.post('/register', register);

module.exports = router;
