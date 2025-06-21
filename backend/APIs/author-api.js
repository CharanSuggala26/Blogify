const exp=require('express')
const authorApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const expressAsyncHandler=require('express-async-handler')
const verifyToken =require('../Middlewares/verifyToken')
const bcryptjs=require('bcryptjs')


let authorsCollection;
let articlesCollection;

authorApp.use((req,res,next)=>{
    authorsCollection=req.app.get("authorsCollection");
    articlesCollection=req.app.get("articlesCollection");
    next();
})

authorApp.post('/user',expressAsyncHandler(createUserOrAuthor))

authorApp.post('/login',expressAsyncHandler(userOrAuthorLogin) )


authorApp.post('/new-article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newArticle=req.body;
    await articlesCollection.insertOne(article);
    res.send({message:"Article added successfully"});
}))

authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    const usernameofAuthor=req.params.username;
    let articlesList=await articlesCollection.find({username:usernameofAuthor,status:true}).toArray();
    res.send({message:"Articles",payload:articlesList});
}))

authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    const modifiedArticle=req.body;
    console.log("modifiedArticle",modifiedArticle);
    let articleAfterModification= await articlesCollection.findOneAndUpdate({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}},{returnDocument:'after'})
    console.log("articleAfterModification",articleAfterModification);
    res.send({message:"Article updated successfully",payload:articleAfterModification});
}))

//delete article(soft delete)
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    let article=req.body;
    await articlesCollection.updateOne({articleId:article.articleId},{$set:{...article}})
    res.send({message:"Article deleted"})
}))

module.exports=authorApp;