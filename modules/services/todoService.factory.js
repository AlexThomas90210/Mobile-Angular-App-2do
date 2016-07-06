angular.module('todoApp')
    .factory("todoService", todoService);

function todoService(){
    /* variable to store the todos */
    var todoList = [
        {"name":"Hi! Welcome to 2Do","description":"This is an example todo. Add & delete some more 2Dos! click on a todo to edit it."}
    ];

    var todoService = {};

    /* get all todos */
    todoService.getList = function(){ return todoList; };

    /* get a specific todo */
    todoService.getTodoAtIndex = function(index){
        /* return null if index is not in range */
        return todoList.length > index ? todoList[index] : null;
    };

    /* add a new todo */
    todoService.add = function(name , description){
        /* create the todo then add it to the todoList */
        newTodo = {
            "name" : name,
            "description" : description
        };
        todoList.push(newTodo);
    };

    /* update a specific todo */
    todoService.update = function(newName , newDescription , index){
        /* first check if the index is in range */
        if (todoList.length > index){
            todoList[index].name = newName;
            todoList[index].description = newDescription;
        }
    };

    /* delete a specific todo */
    todoService.delete = function(index){
        if (todoList.length > index) {
            todoList.splice(index , 1);
        }
    };

    return todoService;
}
