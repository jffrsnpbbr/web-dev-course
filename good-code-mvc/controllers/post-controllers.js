const Post = require('../models/post');
const validationSession = require('../utils/validation-session');
const validation = require('../utils/validation');

function getHome(req, res) {
  res.render('welcome');
}

async function getAdmin(req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render('401');
  }

  // const posts = await db.getDb().collection('posts').find().toArray();
  const posts = await Post.fetchAll();

  const sessionInputData = validationSession.getSessionErrorData(req, {
    title: '',
    content: '',
  });

  res.render('admin', {
    posts: posts,
    inputData: sessionInputData,
  });
}

async function createPost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: 'Invalid input - please check your data.',
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect('/admin');
      }
    );
    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const post = new Post(enteredTitle, enteredContent);
  await post.save();

  res.redirect('/admin');
}

async function getSinglePost(req, res, next) {
  // const post = await Post.fetch(req.params.id);

  // if (!post) {
  //   return res.render('404'); // 404.ejs is missing at this point - it will be added later!
  // }
  let post;

  try {
    post = new Post(null, null, req.params.id);
  } catch (error) {
    console.error(error)
    return res.render('404');
  }

  await post.fetch();

  if (!post.title || !post.content) {
    return res.render('404');
  }

  const sessionInputData = validationSession.getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  });

  res.render('single-post', {
    post: post,
    inputData: sessionInputData,
  });
}

async function updatePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: 'Invalid Input - Please check your data.',
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );
    return;
  }

  const post = new Post(enteredTitle, enteredContent, req.params.id);
  await post.save();

  res.redirect('/admin');
}

async function deletePost(req, res) {
  // const postId = new ObjectId(req.params.id);
  // await db.getDb().collection('posts').deleteOne({ _id: postId });
  const post = new Post(null, null, req.params.id);
  await post.delete();

  res.redirect('/admin');
}

module.exports = {
  getHome,
  getAdmin,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
};
