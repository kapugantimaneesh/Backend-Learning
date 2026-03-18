const express = require("express");
const app = express();
const userModel = require("./models/userModel");
const postModel = require("./models/postModel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.send("hi");
});
app.get("/create", async function (req, res) {
  let user = await userModel.create({
    username: "Maneesh",
    email: "kapugantimaneesh2005@gmail.com",
    age: 20,
  });
  res.send(user);
});
app.get("/createpost", async function (req, res) {
  let post = await postModel.create({
    postdata: "iphone",
    user: "69b92771dd62e9e7ecf405d0",
  });
  let user = await userModel.findOne({ _id: "69b92771dd62e9e7ecf405d0" });
  user.posts.push(post._id);
  await user.save();
  res.send({ post: post, user: user });
});
app.listen(3000, function () {
  console.log("the app is running on port 3000..........");
});
