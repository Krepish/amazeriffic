var main = function(toDoObjects) {
	"use strict";
	var toDoList,
			tabs = [];

	toDoList = toDoObjects.map(function (toDo) {
		return toDo.description;
	});
	
	tabs.push({
		"name" : "New",
		"content" : function (callback) {
			console.log('первая вкладка');
			$.get("todolist.json",function (toDoObjects) {
				var $content = $("<ul>"),
						i;
				toDoList = toDoObjects.map(function (toDo) {
					return toDo.description;
				});
				for (i = toDoList.length-1; i>=0 ; i--) {
					var toDo = toDoList[i];
					$content.append($("<li>").text(toDo));
				};
				callback(null,$content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});				
		}
	});
	tabs.push({
		"name" : "Old",
		"content" : function(callback){
			console.log('вторая вкладка');
			$.get("todolist.json",function (toDoObjects) {
				var $content = $("<ul>");
				//обернуть в функцию
				/*toDoList = toDoObjects.map(function (toDo) {
					return toDo.description;
				});*/
				toDoObjects.forEach(function (toDo) {
					var $todoLi = $("<li>").text(toDo.description),
							$todoRemoveLink = $("<a>").attr("href","todolist/" + toDo._id);
							//alert("todolist/" + toDo._id);
					$todoLi.on("click", function () {
						$.ajax({
							"url" : "todolist/" + toDo._id,
							"type" : "DELETE",
							"success" : function (result) {
								console.log("delete delete");
							}
						}).done(function (){
							console.log("YEP!");
						})
						.fail(function (err) {
							console.log("UPS, ERROR " + err);
						});
						this.remove();
					//return false;
					});
					$todoLi.append($todoRemoveLink);
					$content.append($todoLi);					
				});
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});
	tabs.push({
		"name" : "Tags",
		"content" : function(callback){
			console.log('третья вкладка');
			$.get("todolist.json", function (toDoObjects) {
				var organizedByTag = organizeByTags(toDoObjects);
				var $content = $("<ul>");
				organizedByTag.forEach(function (point) {
          var $tag = $("<h3>").text(point.name);
          $content.append($tag);
          point.toDos.forEach(function (toDo) {
            var $toDo = $("<li>").text(toDo);
            $content.append($toDo);
          });
        });
        callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});
	tabs.push({
		"name" : "Add",
		"content" : function(callback){
			console.log('четвертая вкладка');
			$.get("todolist.json", function (toDoObjects) {
				var $content = $("<ul>");

				var $input = $("<input>").addClass("description"),
						$inputLabel = $("<p>").text("Description:"),
						$tagInput = $("<input>").addClass("tags"),
						$tagLabel = $("<p>").text("Tags:"),
						$button = $("<button>").text("Add new point");

						$button.on("click",function () {
							if (($input.val() !== "") && ($tagInput.val() !== "")) {
								var description = $input.val(),
								tags = $tagInput.val().split(","),
								newToDo = {"description" : description, "tags" : tags};
								//alert(description);
								$.post("/todolist", newToDo, function (response) {
									
									//console.log(response);
									//toDoObjects = response;
									//console.log("Client: We get data from server!");
									//toDoObjects.push(newToDo);
									/*
									toDoList = toDoObjects.map( function (toDo) {
										return toDo.description;
									});
									*/
									$input.val("");
									$tagInput.val("");
									$(".tabs a:first span").trigger("click");
								});
							};
						});
					$content = $("<div>").append($inputLabel)
										 .append($input)
										 .append($tagLabel)
										 .append($tagInput)
										 .append($button);
			callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});
	
	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""),
				$spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$("main .tabs").append($aElement);
		$spanElement.on("click", function () {
			//var $content;
			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .content").empty();
			tab.content(function (err, $content) {
				if(err !== null ){
					alert(err);
				} else {
					$("main .content").append($content);
				}			
			});
			
			return false;//останавливает обновления
		});

	});

	$(".tabs a:first-child span").trigger("click");
	
	var organizeByTags = function (toDoObjects) {
       
        var tagsList = [];
        toDoObjects.forEach(function (toDo) {
            toDo.tags.forEach(function (tag) {
                if (tagsList.indexOf(tag) === -1) {
                    tagsList.push(tag);
                };
            });
        });
 
        var organizedByTag = [];
        tagsList.forEach(function (tag) {
            var toDos = [];
            toDoObjects.forEach(function (toDo) {
                if(toDo.tags.indexOf(tag) !== -1){
                  toDos.push(toDo.description);
                };
            });                
        
						var objByTag = {};
        		objByTag.name = tag;
        		objByTag.toDos = toDos; 
        		organizedByTag.push(objByTag);
 				});

        return organizedByTag;
    };  
};

$(document).ready( function () {
	$.getJSON("todolist.json", function (toDoObjects) {
		main(toDoObjects);
	});
});