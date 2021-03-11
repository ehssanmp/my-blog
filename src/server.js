import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import Articles from './myblog'
import path from 'path'


const app=express();
mongoose.connect("mongodb+srv://UserEhssan:78Ehssan@cluster0.kcp8a.mongodb.net/Articles?retryWrites=true&w=majority",{useNewUrlParser:true});
mongoose.connection
.once('open',()=>{console.log("kir toot")})
.on('error',(error)=>{console.log('joon bachat')});
app.use(express.static(path.join(__dirname,'/build')))
app.use(bodyParser.json())


app.get('/api/articles/:name',(req,res)=>{
    const articleName=req.params.name;
    Articles.findOne({name:articleName}).then(result=>{
        res.status(200).json(result);
    })
})

app.post('/api/articles/:name/upvote',(req,res)=>{
    const articleName=req.params.name;
    Articles.findOneAndUpdate({name:articleName}).then(rstls=>{
        rstls.upvotes+=1;
        res.send(`${rstls}`)
        rstls.save()
    })
    

})

app.post('/first-commit',(req,res)=>{
    const articles = new Articles({
        name:req.body.name,
        upvotes:req.body.upvotes,
        comments:req.body.comments
    })
    articles.save().then(()=>{
        res.status(200).send("done");
    });
})

app.post('/api/articles/:name/add-comment',(req,res)=>{
   const {username,text}=req.body;
   const articleName=req.params.name;
   Articles.findOneAndUpdate({name:articleName}).then(results=>{
       results.comments.push({username,text})
       res.status(200).send("done");
       results.save();
   })
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/build/index.html'))
})

app.listen(8001,()=>{
    console.log("listening on port 8000")
})