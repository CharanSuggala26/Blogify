const exp=require('express')
const blogsApp=exp.Router()

blogsApp.get('/',(req,res)=>{
    const blogCollection=req.app.get("blogCollection");
    const data=blogCollection.find().toArray();
    data.then((data)=>{
        res.status(200).send({data:data,message:"Success"})
    }).catch((error)=>{
        res.status(400).send({message:"Error"})
    })
})

blogsApp.post('/add',(req,res)=>{
    const blogCollection=req.app.get("blogCollection");
    const data=blogCollection.insertOne(req.body);
    data.then((data)=>{
        res.status(200).send({data:data,message:"Successfully added into Blogs"});
    }).catch((error)=>{
        res.status(404).send({message:"Failed Adding Blogs"});
    })
})


blogsApp.get('/get/:id',(req,res)=>{
    const blogCollection=req.app.get("blogCollection");
    const data=blogCollection.find({bloggerId:req.params.id}).toArray();
    data.then((data)=>{
        res.status(200).send({data:data,message:"Success in finding blog"})
    }).catch((error)=>{
        res.status(400).send({message:"Error"})
    })
})

blogsApp.get('/update/:id',(req,res)=>{
    const blogCollection=req.app.get("blogCollection");
    const data=blogCollection.updateOne({bloggerId:req.params.id},{$set:{title:req.body.title,content:req.body.content}});
    data.then((data)=>{
        res.status(200).send({data:data,message:"Success in updating blog"})
    }).catch((error)=>{
        res.status(400).send({message:"Error"})
    })
})

module.exports=blogsApp;
