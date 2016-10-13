var User = require("../models/user.js"),
		//mongoose = require("mongoose"),
		UsersController = {};

User.find({},function (err, result) {
		if(err !== null) {
			console.log(err);
		} else if (result.length === 0) {
			console.log("test user ...");
			var exampleUser = new User({"username" : "sasha"});
			exampleUser.save(function (err, result) {
				if(err) {
					console.log(err);
				} else {
					console.log("Test-user was saved.")
				}
			});
		}
		console.log("Old test-user");
	});

UsersController.index = function (req, res) {
	console.log("index");
	res.send(200);
};
UsersController.show = function (req, res) {
	console.log("Show");
	User.find({"username" : req.params.username}, function (err, result) {
		if (err) {
			console.log(err);
			res.send(500, err);
		} else if (result.length !== 0) {
			res.sendfile("./client/index.html");
		} else {
			res.send(404);
		}
	});
};
UsersController.create = function (req, res) {
	console.log("create");
	res.send(200);
};
UsersController.update = function (req, res) {
	console.log("update");
	res.send(200);
};
UsersController.destroy = function (req, res) {
	console.log("destroy");
	res.send(200);
};

module.exports = UsersController;