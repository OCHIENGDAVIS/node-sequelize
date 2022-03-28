const express = require('express');
const session = require('express-session');
const passport = require('passport');

const authRouter = require('./routes/auth');
require('dotenv').config();
require('./passport/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: 'supersercret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/auth', authRouter);

module.exports = app;
