//npm i mongoose
//mongoose is mainly used for the converstaion between the application server and the mongo database server
//these are odm and orm(object document mapping,object relational mapping )

const express = require("express");
const userModel = require("./userModel");
const app = express();
app.get("/", function (req, res) {
  res.send("hello from backed sever");
});
app.get("/create", async (req, res) => {
  //this create is a async task mongoose all tasks are async only
  //so we use async await
  let createdUser = await userModel.create({
    name: "Maneesh",
    username: "Maneesh",
    email: "hello",
  });
  res.send(createdUser);
});
app.get("/update", async (req, res) => {
  //   userModel.findOneAndUpdate(findone, update,{new:true});
  const updated = await userModel.findOneAndUpdate(
    { username: "Maneesh" },
    { name: "Maneesh Karthikeya" },
    { new: true },
  );
  res.send(updated);
});
app.get("/read", async (req, res) => {
  const allUsers = await userModel.find();
  res.send(allUsers);
});
app.get("/readd", async (req, res) => {
  const allUsers = await userModel.find({ username: "Maneesh" });
  res.send(allUsers);
});
app.get("/delete", async (req, res) => {
  const allUsers = await userModel.findOneAndDelete({ username: "Maneesh" });
  res.send(allUsers);
});
app.listen(3000, function (req, res) {
  console.log("the app is running on 3000.... port");
});
