var express = require("express"),
	http = require("http"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    ToDosController = require("./controllers/todolist_controller.js"),
    usersController = require("./controllers/user_controller.js"),
	app = express(),
    port = process.env.PORT || 3000;



app.set("strict routing", false);
app.use(express.static(__dirname + "/client"));
app.use(bodyParser.urlencoded());


http.createServer(app).listen(port);

app.get("/todolist.json",  ToDosController.index);
app.post("/todolist", ToDosController.create);
app.get("/todolist/:id", ToDosController.show);
app.del("/todolist/:id", ToDosController.destroy);

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.del("/users/:username", usersController.destroy);

app.get("/users/:username/todolist.json",  ToDosController.index);
app.post("/users/:username/todolist", ToDosController.create);
app.get("/users/:username/todolist/:id", ToDosController.show);
app.del("/users/:username/todolist/:id", ToDosController.destroy);