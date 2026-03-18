const express = require("express");
const path = require("path");
const app = express();
const userModel = require("./userModel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/read", async function (req, res) {
  const users = await userModel.find();
  res.render("read", { users: users });
});
app.post("/create", async function (req, res) {
  await userModel.create({
    name: req.body.name,
    email: req.body.email,
    imgur: req.body.imgur,
  });
  res.redirect("/");
});
app.get("/delete/:name", async (req, res) => {
  await userModel.findOneAndDelete({ name: req.params.name });
  res.redirect("/read");
});
app.get("/edit/:name", async (req, res) => {
  let user = await userModel.findOne({ name: req.params.name });
  res.render("edit", { user: user });
});
app.post("/update/:name", async (req, res) => {
  await userModel.findOneAndUpdate(
    { name: req.params.name },
    {
      name: req.body.name,
      email: req.body.email,
      imgur: req.body.imgur,
    },
    { new: true },
  );
  res.redirect("/read");
});

app.listen(3000, function (req, res) {
  console.log("app is running on port 3000...");
});
