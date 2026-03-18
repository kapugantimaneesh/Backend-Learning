const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("index");
});
app.post("/create", function (req, res) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      let createdUser = await userModel.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        age: req.body.age,
      });
      let token = jwt.sign({ email: req.body.email }, "shhhhhhhhhh");
      res.cookie("token", token);
      res.redirect("/");
    });
  });
});
app.post("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.post("/login", async function (req, res) {
  let user = await userModel.findOne({
    email: req.body.email,
  });
  if (!user) {
    res.send("something went wrong");
  } else {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        res.send("yes you can login");
        let token = jwt.sign({ email: user.email }, "shhhhhhhhhh");
        res.cookie("token", token);
        res.redirect("/");
      } else {
        res.send("you cannot login");
      }
    });
  }
});

app.listen(3000, function () {
  console.log("server is running on port 3000.....");
});
