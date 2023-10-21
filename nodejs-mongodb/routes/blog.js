const express = require('express');
const mongodb = require('mongodb');

const db = require('../data/database');
const { render } = require('ejs');
const { restart } = require('nodemon');
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
  const authors = await db.getDatabase().collection('authors').find().toArray();
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

router.get('/posts/:id', async function (req, res, next) {
  let postId = '';

  try {
    postId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(404).render(404);
    // return next(error);
  }
  
  const post = await db
    .getDatabase()
    .collection('posts')
    .findOne({ _id: postId}, { summary: 0 });
  console.log(post);

  if (!post) {
    return res.status(404).render(404);
  }

  post.humanReadableDate = post.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  post.date = post.date.toISOString();

  res.render('post-detail', { post });
});

router.get('/posts/:id/edit', async function (req, res) {
  console.log('posts/edit');
  const postId = req.params.id;
  const post = await db
    .getDatabase()
    .collection('posts')
    .findOne({ _id: new ObjectId(postId) }, { title: 1, summary: 1, body: 1 });

  if (!post) {
    res.status(404).render('404');
  }

  res.render('update-post', { post });
});

router.post('/posts/:id/edit', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const result = await db
    .getDatabase()
    .collection('posts')
    .updateOne(
      { _id: postId },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
        },
      }
    );
  res.redirect('/posts');
});

router.post('/posts/:id/delete', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const result = await db
    .getDatabase()
    .collection('posts')
    .deleteOne({ _id: postId });
  console.log(result);

  res.redirect('/posts');
});

module.exports = router;
