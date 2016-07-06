/*
*	Author:	Alex Thomas
*	Assignment:	WE4 Mobile	Web	Applications,	Digital	Skills	Academy
*	Date	:	2016/07/06
*/

angular.module('todoApp')
    .controller('editController' , editController );

function editController($scope , $routeParams , todoService){
    /* selectedIndex is not needed on scope as its not needed in the view */
    var selectedIndex = $routeParams.index;

    /* pageClass is needed in the view because an animation is defined , each page can have its own animation when added depending on this variable */
    $scope.pageClass = "page-edit";
    $scope.selectedTodo = todoService.getTodoAtIndex(selectedIndex);
    $scope.todoCopy = angular.copy($scope.selectedTodo);
    /*
        using copy() as I do not want data binding as the user changes the value until they click save changes
        important to understand that the copy is what is displayed to the user and what they are changing
        then on save we make the original todo = the copy
        then on undochanges we make the copy = the original
        I still need the original todo on the $scope though because in the view im using it as an expression for ng-disable on the buttons
     */

    $scope.didClickSaveChanges = function(){
        /* update the todo to the copied todo */
        todoService.update($scope.todoCopy.name , $scope.todoCopy.description , selectedIndex);
    };

    $scope.didClickUndoChanges = function(){
        /* reset the copy to the original todo */
        $scope.todoCopy = angular.copy($scope.selectedTodo);
    };
}
