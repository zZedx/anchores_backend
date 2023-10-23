const express = require('express')
const app =express()
const mongoose = require('mongoose')
const cors = require('cors');

const User = require('./models/user');
const Post = require('./models/posts');
const Comment = require('./models/comments');

mongoose.connect('mongodb://127.0.0.1:27017/anchors')
.then(()=>{
    console.log('Mongoose Running')
})
.catch((e)=>{
    console.log(e);
})

app.use(express.json());
app.use(cors());

app.post('/login',(req,res)=>{
    const user = new User(req.body)
    user.save()
    res.json()
})

app.post('/createPost' , async(req,res)=>{
    const {content} = req.body
    const {name , email } = req.body
    const user = await User.findOne({name ,email})
    const post = await new Post({content})
    post.user = user
    post.save()
    res.json()
})
app.get('/posts' , async(req,res)=>{
    const posts = await Post.find().populate('user').populate('comments');
    console.log(posts)
    res.json(posts) 
})

app.post('/addComment' , async(req,res)=>{
    const {comment , name , email , id} = req.body
    // const user = await User.findOne({name ,email})
    const post = await Post.findById(id)
    const newComment = new Comment({comment})
    await newComment.save()
    post.comments.push(newComment) 
    await post.save()
    console.log(post)
    res.json()
})
app.listen(3000,()=>{
    console.log('Listening')
})