const exp = require('express');
const authorApp = exp.Router();
const { createUserOrAuthor, userOrAuthorLogin } = require('./Utils');
const expressAsyncHandler = require('express-async-handler');
const verifyToken = require('../Middlewares/verifyToken');
const bcryptjs = require('bcryptjs');

let authorsCollection;
let articlesCollection;

// Middleware to get collections
authorApp.use((req, res, next) => {
  authorsCollection = req.app.get("authorsCollection");
  articlesCollection = req.app.get("articlesCollection");
  next();
});

// Author registration
authorApp.post('/user', expressAsyncHandler(createUserOrAuthor));

// Author login
authorApp.post('/login', expressAsyncHandler(userOrAuthorLogin));

// Create a new article
authorApp.post('/new-article', verifyToken, expressAsyncHandler(async (req, res) => {
  const newArticle = req.body;
  await articlesCollection.insertOne(newArticle);
  res.send({ message: "New article added" });
}));

// Get articles by username
authorApp.get('/articles/:username', verifyToken, expressAsyncHandler(async (req, res) => {
  const usernameofAuthor = req.params.username;
  let articlesList = await articlesCollection
    .find({ username: usernameofAuthor, status: true })
    .toArray();
  res.send({ message: "Articles", payload: articlesList });
}));

// Update an article
authorApp.put('/article/:articleId', verifyToken, expressAsyncHandler(async (req, res) => {
  const modifiedArticle = req.body;
  let articleAfterModification = await articlesCollection.findOneAndUpdate(
    { articleId: modifiedArticle.articleId },
    { $set: { ...modifiedArticle } },
    { returnDocument: 'after' }
  );
  res.send({ message: "Article updated successfully", payload: articleAfterModification.value });
}));

// Soft delete an article (status: false)
authorApp.put('/article/delete/:articleId', verifyToken, expressAsyncHandler(async (req, res) => {
  const articleId = +req.params.articleId;
  await articlesCollection.updateOne(
    { articleId },
    { $set: { status: false } }
  );
  res.send({ message: "Article deleted (soft delete)" });
}));

module.exports = authorApp;
