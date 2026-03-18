const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://amritagamer844_db_user:3EmZy7tKujUCEQWu@cluster0.7qj55ya.mongodb.net/",
  )
  .then(() => {
    console.log("mongo db is running ");
  })
  .catch((err) => {
    console.log(err.message);
  });

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
});

module.exports = mongoose.model("user", userSchema);
