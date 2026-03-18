const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); //we are here saying that our backed will show ejs pages render(this means create html pages and send browser)
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/profile/:username/:age", function (req, res) {
  res.end(
    `this is ${req.params.username} page and his age is ${req.params.age}`,
  );
});
app.listen(3000, function () {
  console.log("the server is running on port 3000 .........");
});
