// programming language X
// not tech,library,framework
// this is called js run time enviornment

//story of node
// so rayan dhal has used google v8 engine and thought of using js code to create backend
// because chrome v8 is done in c++

//its like we write js code wrapper layer of js recive it and that code+v8 engine c++ module = create a server
//so this complete js wrpper + v8 code engine is node js

//node js is a java script run time environment
//npm is package store
const fs = require("fs");
// write copy rename unlink append
// fs.writeFile("hey.txt", "hello kaise he", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("done");
//   }
// });
// fs.appendFile("hey.txt", " kya kar rahe ho", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("done");
//   }
// });
// fs.rename("hey.txt", "hello.txt", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("done");
//   }
// });
// fs.copyFile("hello.txt", "copy.txt", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("done");
//   }
// });
// fs.unlink("hello.txt", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("done");
//   }
// });

///////////http module https

const http = require("http");
const server = http.createServer(function (req, res) {
  res.end("hello world");
});
server.listen(3000);
