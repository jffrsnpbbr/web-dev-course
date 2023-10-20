const express = require('express');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function (req, res) {
  const queryString = `
    SELECT posts.*, authors.name as author_name
    FROM posts INNER JOIN authors ON posts.author_id = authors.id
  `;
  const [posts] = await db.query(queryString);

  res.render('posts-list', { posts });
});

router.get('/new-post', async function (req, res) {
  const [authors] = await db.query('SELECT * FROM authors');
  res.render('create-post', { authors });
});

router.post('/new-post', async function (req, res) {
  const author = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    'INSERT INTO posts (`title`, `summary`, `body`, `author_id`) VALUES (?)',
    [author]
  );
  res.redirect('/posts');
});

router.get('/posts/:id', async function (req, res) {
  const postId = req.params.id;
  const queryString = `
    SELECT posts.*, authors.name as author_name, authors.email as author_email
    FROM posts INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ?;
  `;
  const [posts] = await db.query(queryString, [postId]);
  if (!posts || posts.length === 0) {
    return res.status(404).render('404');
  }

  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };

  res.render('post-detail', { post: postData });
});

router.get('/posts/:id/edit', async function (req, res) {
  const queryString = `
    SELECT * FROM posts WHERE id = ?
  `
  const [posts] = await db.query(queryString, [ req.params.id ]);

  if (!posts || posts.length === 0) {
    return res.status(404).render('404');
  }


  res.render('update-post', { post: posts[0] })
});

module.exports = router;
