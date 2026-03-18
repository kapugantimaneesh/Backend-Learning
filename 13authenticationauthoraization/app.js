const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  //cookie is used to store some data from server
  res.cookie("name", "Maneesh");
  res.send("done great");
});
app.get("/read", function (req, res) {
  //i can go to any page the cookies are attached to every page
  console.log(req.cookies); //you will get undefined need to use a cookie parser
  //so when ever i done a request i will send a string using cookies to server this will be helped if we done some requests
  res.send("read page");
});

app.get("/bycrpt", function (req, res) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("Maneesh", salt, function (err, hash) {
      console.log(hash);
    });
  });
});
app.get("/compare", function (req, res) {
  bcrypt.compare(
    "maneesh",
    "$2b$10$htEQ8znJRLoPy.ZOT0tfkeKwzs9OvGV4gPZeAE9Jle1KKgQlsjrnS",
    function (err, result) {
      console.log(result);
    },
  );
});
app.get("/jwt", function (req, res) {
  let token = jwt.sign({ email: "maneesh@gmail.com" }, "secret"); //this secret is a word on which the mail will be encrypted
  res.cookie("token", token);
  res.send("done");
});
app.get("/jwtd", function (req, res) {
  const keyy = jwt.verify(req.cookies.token, "secret");
  console.log(keyy);
});
app.listen(3000, function () {
  console.log("app is running on 3000..........");
});
