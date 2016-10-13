var mongoose = require("mongoose"),
		ToDoSchema,
		ObjectId = mongoose.Schema.Types.ObjectId;

ToDoSchema = mongoose.Schema({
	description: String,
	username : String,
	tags : [String],
	owner : {type : ObjectId, ref : "User"}
});

mongoose.connect('mongodb://localhost/amazeriffic');

var ToDo = mongoose.model("ToDo", ToDoSchema);
module.exports = ToDo;
