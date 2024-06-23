const mongoose = require(`mongoose`);
mongoose.connect("mongodb://127.0.0.1:27017/Passport");
var PassportlocalMongoose =  require(`passport-local-mongoose`);


const userSchema = mongoose.Schema({
  username : String,
  email :String,
  password :String
});



userSchema.plugin(PassportlocalMongoose);


  module.exports = mongoose.model("users", userSchema)
