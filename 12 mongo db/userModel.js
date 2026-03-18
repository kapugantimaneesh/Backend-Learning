const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://amritagamer844_db_user:3EmZy7tKujUCEQWu@cluster0.7qj55ya.mongodb.net/",
  )
  .then(() => {
    console.log("the mongo db sever is running");
  })
  .catch((err) => {
    console.log(err.message);
  });
const userModel = mongoose.Schema({
  name: String,
  email: String,
  imgur: String,
});
module.exports = mongoose.model("user", userModel);
