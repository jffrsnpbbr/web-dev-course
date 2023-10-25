const express = require('express');
const bycrpt = require('bcryptjs');

const db = require('../data/database');
const session = require('express-session');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = userData['password'];

  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes('@')
  ) {
    console.log('Incorrect Data');
    return res.redirect('/signup');
  }
  const existingUser = await db
    .getDb()
    .collection('users')
    .findOne({ email: enteredEmail });

  if (existingUser) {
    console.log('User exist already!');
    return res.redirect('/signup');
  }

  const hashedPassword = await bycrpt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection('users').insertOne(user);

  res.redirect('/login');
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const hashedPassword = await bycrpt.hash(enteredPassword, 12);

  const existingUser = await db
    .getDb()
    .collection('users')
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    console.log('Could not login');
    res.redirect('/login');
  }

  const passwordsAreEqual = await bycrpt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    console.log('Could not login - passwords are not equal!');
    res.redirect('/login');
  }

  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
  };

  req.session.isAuthenticated = true;
  req.session.save(function () {
    console.log('User is authenticated!');
    res.redirect('/admin');
  });
});

router.get('/admin', function (req, res) {
  // Check user "ticket"
  res.render('admin');
});

router.post('/logout', function (req, res) {});

module.exports = router;
