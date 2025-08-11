const exp=require('express')
require('dotenv').config()
const cors=require('cors')
const {MongoClient}=require('mongodb')


const app=exp()
const port=process.env.PORT

app.use(cors())
//app.use(express.json())

const client = new MongoClient(process.env.DB_URI);

client
.connect()
.then(()=>{
    const db=client.db("blogDB");
    app.set("bloggerCollection",db.collection("blogger"));
    app.set("blogCollection",db.collection("blog"));
    app.set("commentCollection",db.collection("comment"));
    console.log("DB connected successfully")
})
.catch((error)=>{
    console.error("Error connecting database: ",error);
});


app.listen(port,()=>{
    console.log(`server is running on port : ${port}`);
})