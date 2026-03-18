const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const userModel = require("./models/userModel");
const postModel = require("./models/postModel");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/profile", isloggedin, async function (req, res) {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");

  res.render("profile", { user: user });
});
app.get("/like/:id", isloggedin, async function (req, res) {
  const post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) == -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect("/profile");
});
app.post("/register", async function (req, res) {
  const { name, username, email, age, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user) {
    return res.status(500).send("user already registered");
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let user = await userModel.create({
          name: name,
          username: username,
          email: email,
          age: age,
          password: hash,
        });
        var token = jwt.sign({ email, userid: user._id }, "shhhhh");
        console.log("hey going to send");
        res.cookie("token", token);
        console.log("sent");
        console.log(`A User has Registed with Mail : ${email}`);
        res.redirect("/login");
      });
    });
  }
});
app.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(500).send("something went wrong");
  } else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        var token = jwt.sign({ email, userid: user._id }, "shhhhh");
        console.log("hey going to send");
        res.cookie("token", token);
        res.status(200).send("Login successfull");
      } else {
        res.redirect("/profile");
      }
    });
  }
});
app.get("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("/login");
});
app.post("/post", isloggedin, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content: content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});
app.get("/edit/:id", async function (req, res) {
  const post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});
app.post("/update/:id", async function (req, res) {
  await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content },
  );

  res.redirect("/profile");
});
function isloggedin(req, res, next) {
  if (req.cookies.token === "") {
    res.redirect("/login");
  } else {
    jwt.verify(req.cookies.token, "shhhhh", function (err, decoded) {
      req.user = decoded;
    });
    next();
  }
}
app.listen(3000, function () {
  console.log("the app is running on 3000.......");
});
