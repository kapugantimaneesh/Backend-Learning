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
  name: String,
  username: String,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
