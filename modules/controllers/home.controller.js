/*
*	Author:	Alex Thomas
*	Assignment:	WE4 Mobile	Web	Applications,	Digital	Skills	Academy
*	Date	:	2016/07/06
*/

angular.module('todoApp')
    .controller('homeController' , homeController);

function homeController($scope , $location , todoService){
    /* pageClass is needed in the view because an animation is defined , each page can have its own animation when added depending on this variable */
    $scope.pageClass = "page-home";
    $scope.todoList = todoService.getList();
    /*
    I want to define the newTodoName & Description here even though its not needed
    so that all variables are defined in controller so its easier to see all define variables in one place
     */
    $scope.newTodoName = "";
    $scope.newTodoDescription = "";

    $scope.didClickTodoAtIndex = function(index){
        /* pass the index into the url for the next controller to use */
        $location.url('/todo/'+index);
    };

    $scope.didClickDeleteTodoAtIndex = function(index){
        /* delete the todo from todoService */
        todoService.delete(index);
    };

    $scope.showAddTodoModal = function(){
        //Using Jquery to trigger the modal over a href="#modalID" because
        //using a href was triggering the ng-view show and hide animation from ngAnimate module at the same time
        $('#add2Do').modal('toggle');
    };

    $scope.addTodoFormSubmit = function(){
        /* add the new todo to todoService */
        todoService.add($scope.newTodoName , $scope.newTodoDescription);
        /* reset the newTodoName & newTodo Description for the user */
        $scope.newTodoName = "";
        $scope.newTodoDescription = "";
        /* hide modal */
        $('#add2Do').modal('toggle');
    };
}
