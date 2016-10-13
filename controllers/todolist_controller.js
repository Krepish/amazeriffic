var ToDo = require("../models/todo.js"),
    User = require("../models/user.js"),
		ToDosController = {};

ToDosController.index = function (req, res) {
	var username = req.params.username || null,
      respondWithToDos;
  respondWithToDos = function (query) {
    ToDo.find(query, function (err, toDos) {
      if(err !== null) {
        res.json(500, err);
      } else {
        res.json(200, toDos);
      }
    });
  };
  if (username !== null) {
    User.find({"username" : username},function(err, result){
        if(err !== null) {
          res.json(500, err);
        } else if (result.length === 0) {
          res.send(404);
        } else {
          respondWithToDos({"owner" : result[0].id });
        }
    });
  } else {
    respondWithToDos({});
  }
};
  
ToDosController.create = function (req, res) {
	var username = req.params.username || null,
      newToDo = new ToDo({"description" : req.body.description, "tags" : req.body.tags});
  User.find({"username" : username},function (err, result) {
    if (err) {
      res.send(500);
    } else {
      if (result.length === 0) {
        newToDo.owner = null;
      } else {
        newToDo.owner = result[0]._id;
      }
      newToDo.save(function (err, result) {
        if (err !== null) {
          res.json(500, err);
        } else {
          res.json(200, result);
        }
      });
    }
  });
};

ToDosController.show = function (req, res) {
	var id = req.params.id;
	ToDo.find({"_id":id}, function (err, todo){
		if (err !== null) {
			res.json(500, err);
		} else {
			if(todo.length > 0) {
				res.json(200, todo[0]);
			} else {
				res.send(404);
			}
		}
	});
};

ToDosController.destroy = function (req, res) {
    var id = req.params.id;
    ToDo.remove({"_id":id},function (err, result) {
        //console.log(result);
        if (err !== null) {
          console.log(err);
          res.json(500,err);
        } else {
        
          res.json(result);
        }
    });
};

module.exports = ToDosController;