const bcrypt = require('bcryptjs');

const db = require('../data/database');

const User = require('../models/user');

const validationSession = require('../utils/validation-session');
const { postIsValid } = require('../utils/validation');

const user = require('../models/user');
function getSignup(req, res) {
  let sessionInputData = validationSession.getSessionErrorData(req, {
    hasError: false,
    email: '',
    confirmEmail: '',
    password: '',
  });

  res.render('signup', { inputData: sessionInputData });
}

function getLogin(req, res) {
  let sessionInputData = validationSession.getSessionErrorData(req, {
    hasError: false,
    email: '',
    password: '',
  });

  res.render('login', {
    inputData: sessionInputData,
  });
}

async function signup(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;

  if (!postIsValid) {
    validationSession.flashErrorsToSession(
      req,
      {
        hasError: true,
        message: 'Invalid input - please check your data.',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect('/signup');
      }
    );
    return;
  }

  const existingUser = await db
    .getDb()
    .collection('users')
    .findOne({ email: enteredEmail });

  if (existingUser) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: 'User exists already!',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect('/signup');
      }
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection('users').insertOne(user);

  res.redirect('/login');
}

async function login(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  let existingUser = await User.alreadyExist(enteredEmail);
  if (!existingUser) {
    validationSession.flashErrorsToSession(
      req,
      {
        hasError: true,
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect('/login');
      }
    );
    return;
  }

  if (!existingUser.passwordIsEqualTo(enteredPassword)) {
    validationSession.flashErrorsToSession(
      req,
      {
        hasError: true,
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect('/login');
      }
    );
    return;
  }

  req.session.user = { id: existingUser.id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect('/admin');
  });
}

function logout(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
}
module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout,
};
