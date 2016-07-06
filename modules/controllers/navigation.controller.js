/*
*	Author:	Alex Thomas
*	Assignment:	WE4 Mobile	Web	Applications,	Digital	Skills	Academy
*	Date	:	2016/07/06
*/

angular.module('todoApp')
    .controller('navigationController' , navigationController);

/* this controller is only for the navigation bar for some logic on when to show the back button and clicking it */
function navigationController($scope , $location){
    /* storing $location on $scope to hide the back button on certain urls with an expression in the view */
    $scope.location = $location;
    $scope.back = function(){
        window.history.back();
    };
}
