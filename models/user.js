var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
	username : String
});

var User = mongoose.model("User",UserSchema);
module.exports = User;