const exp=require('express')
require('dotenv').config()

const app=exp()
const port=process.env.PORT

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`);
})