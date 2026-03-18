//intro to express js
// express js is a found in npm and is a framework
//framework gives you a flow of execution need to follow same order
//manages everything from reciving request and giving back response

const express = require("express");
const app = express();
//this middle ware is executed for all routes below this one

app.use(function (req, res, next) {
  console.log("middle ware running");
  next();
});
app.get("/", function (req, res) {
  res.end("hello world");
});
app.get("/profile", function (req, res, next) {
  //   return next(new Error("something is wrong"));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("error");
  next();
});
app.listen(3000, function (req, res) {
  console.log("app is running ");
});
