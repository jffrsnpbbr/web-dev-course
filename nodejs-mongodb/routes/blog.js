const express = require('express');
const mongodb = require('mongodb');

const db = require('../data/database');
const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get('/', function (req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function (req, res) {
  const posts = await db
    .getDatabase()
    .collection('posts')
    .find({}, { title: 1, summary: 1, 'author.name': 1 })
    .toArray();

  console.log(posts);
  res.render('posts-list', { posts });
});

router.get('/new-post', async function (req, res) {
  const authors = await db
    .getDatabase()
    .collection('authors')
    .find()
    .toArray();
  console.log(authors);
  res.render('create-post', { authors });
});

router.post('/posts', async function (req, res) {
  const authorId = new ObjectId(req.body.author);
  const author = await db
    .getDatabase()
    .collection('authors')
    .findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  const result = await db.getDatabase().collection('posts').insertOne(newPost);
  console.log(result);
  res.redirect('/posts');
});

module.exports = router;
