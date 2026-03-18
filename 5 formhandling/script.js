// handle backend process of form and handle how data is comming from any front end library
//install npm i cookie-parser
//what is session and cookie
//
// so this is main concept when ever you are looking instagram and want to like a photo it asks you for login after login you liked the photo then you will get disconnected from the server so when you again want to like another photo it asks you to login so this is a most frustating process we use this session and cookies concpets
//
// in the given above case can be avoided in this way we firstly send a request to instagam for a photo and instagrams asks who is this and we login while sending the photo back the instagram uses one more string in response when ever we send some other response to it that sends it with the string which will help it to identify the person so this string is cookies and the connection betwen them is session
// when ever you removed that string the session gets logged out
//intro to express js
// express js is a found in npm and is a framework
//framework gives you a flow of execution need to follow same order
//manages everything from reciving request and giving back response

const express = require("express");
const app = express();

// so when ever i am sending the text so tried to send the plain text this create a blob(some mixed text) cannot be read easily by server so we need to process to make this blob to readable so we use this 2 middle wares
// so you can see these 2 options in postman body in data formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
