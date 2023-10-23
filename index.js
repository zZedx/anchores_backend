const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const email = "kartikajmera678@hotmail.com";
const password = "kartik@123";

const User = require("./models/user");
const Post = require("./models/posts");
const Comment = require("./models/comments");

// "mongodb://127.0.0.1:27017/"

const DB_URL ="mongodb+srv://kartikajmera890:kartik123456@anchors.1jtf6q1.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: email,
    pass: password,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("ready for message");
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw error;
  }
};

app.post("/otp", async (req, res) => {
  console.log(req.body);
  const { email: formEmail } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: email,
    to: formEmail,
    subject: "Otp",
    html: `${otp}`,
  };
  await sendEmail(mailOptions);
  res.json(otp);
});

app.post("/login", (req, res) => {
  const user = new User(req.body);
  user.save();
  res.json();
});

app.post("/createPost", async (req, res) => {
  const { content } = req.body;
  const { name, email } = req.body;
  const user = await User.findOne({ name, email });
  const post = await new Post({ content });
  post.user = user;
  post.save();
  res.json();
});
app.get("/posts", async (req, res) => {
  const posts = await Post.find().populate("user").populate("comments");
  res.json(posts);
});

app.post("/addComment", async (req, res) => {
  const { comment, name, email, id } = req.body;
  // const user = await User.findOne({name ,email})
  const post = await Post.findById(id);
  const newComment = new Comment({ comment });
  await newComment.save();
  post.comments.push(newComment);
  await post.save();
  console.log(post);
  res.json();
});
app.listen(3000, () => {
  console.log("Listening");
});
