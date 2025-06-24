const exp = require('express');
const userApp = exp.Router();
const { createUserOrAuthor, userOrAuthorLogin } = require('./Utils');
const expressAsyncHandler = require('express-async-handler');
const verifyToken = require('../Middlewares/verifyToken');

let usersCollection;
let articlesCollection;

userApp.use((req, res, next) => {
  usersCollection = req.app.get('usersCollection');
  articlesCollection = req.app.get('articlesCollection');
  next();
});


userApp.post('/user', expressAsyncHandler(createUserOrAuthor));
userApp.post('/login', expressAsyncHandler(userOrAuthorLogin));

//all published articles (visible to users)
userApp.get('/articles', verifyToken, expressAsyncHandler(async (req, res) => {
  const articlesList = await articlesCollection.find({ status: true }).toArray();
  res.send({ message: "All articles", payload: articlesList });
}));

//  Post a comment on an article by articleId
userApp.post('/comment/:articleId', verifyToken, expressAsyncHandler(async (req, res) => {
  const articleId = +req.params.articleId;
  const userComment = req.body;

  await articlesCollection.updateOne(
    { articleId },
    { $addToSet: { comments: userComment } }
  );

  res.send({ message: "User comment added" });
}));

module.exports = userApp;
