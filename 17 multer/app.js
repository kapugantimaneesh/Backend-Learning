const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.render("this is main page");
});
app.get("/test", function (req, res) {
  res.render("test");
});
app.post("/upload", upload.single("image"), function (req, res) {
  console.log(req.file);
});
app.listen(3000, () => {
  console.log("server is runnning on 3000.......");
});
