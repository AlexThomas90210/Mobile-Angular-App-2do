angular.module('todoApp', ['ngRoute','ngAnimate'])
    .config(function($routeProvider , $locationProvider){
        $routeProvider
        .when('/', {
            templateUrl: './partials/page-home.html',
            controller: 'homeController'
        })
        .when('/todo/:index', {
            templateUrl: './partials/page-edit.html',
            controller: 'editController'
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    .run(function($rootScope , $location){
        //putting some logic on the root scope to handle the navigation & header
        $rootScope.location = $location;
        $rootScope.back = function(){
            window.history.back();
        };
    })
    .factory("todoService",function(){
        var todoService = {};

        var todoList = [
            {"name":"Todo 1","description":"description 1"},
            {"name":"Todo 2","description":"description 2"},
            {"name":"Todo 3","description":"description 3"}
        ];

        todoService.getList = function(){ return todoList; };

        todoService.getTodoAtIndex = function(index){
            return todoList.length > index ? todoList[index] : null;
        };

        todoService.add = function(name , description){
            newTodo = {
                "name" : name,
                "description" : description
            };
            todoList.push(newTodo);
        };

        todoService.update = function(newName , newDescription , index){
            if (todoList.length > index){
                todoList[index].name = newName;
                todoList[index].description = newDescription;
            }
        };

        todoService.delete = function(index){
            if (todoList.length > index) {
                todoList.splice(index , 1);
            }
        };

        return todoService;
    })

    .controller('homeController' , function($scope , $location , todoService){
        $scope.pageClass = "page-home";
        $scope.todoService = todoService;
        $scope.todoList = todoService.getList();
        $scope.newTodoName = "";
        $scope.newTodoDescription = "";

        $scope.addNewTodo = function(){
            $scope.todoService.add($scope.newTodoName , $scope.newTodoDescription);
            $scope.newTodoName = "";
            $scope.newTodoDescription = "";
        };

        $scope.deleteTodo = function(index){
            $scope.todoService.delete(index);
        };

        $scope.didClickTodoAtIndex = function(index){
            $location.url('/todo/'+index);
        };

        $scope.showAddTodoModal = function(){
            //Using Jquery to trigger the modal over a href="#modalID" because
            //using a href was triggering the ng-view show and hide animation from ngAnimate module  at the same time
            $('#add2Do').modal('toggle');
        };

        $scope.addTodoFormSubmit = function(){
            $scope.addNewTodo();
            $('#add2Do').modal('toggle');
        };

    })

    .controller('editController' , function($scope , $routeParams , todoService){
        $scope.pageClass = "page-edit";
        $scope.todoService = todoService;
        $scope.selectedTodo = todoService.getTodoAtIndex($routeParams.index);
        $scope.selectedIndex = $routeParams.index;
        $scope.todoCopy = angular.copy($scope.selectedTodo);

        $scope.saveChanges = function(){
            $scope.todoService.update($scope.todoCopy.name , $scope.todoCopy.description , $scope.selectedIndex);
        };

        $scope.didClickSaveChanges = function(){
            $scope.saveChanges();
        };

        $scope.didClickUndoChanges = function(){
            $scope.todoCopy = angular.copy($scope.selectedTodo);
        };
    });
