var angularTodo = angular.module('angularTodo', []);

angularTodo.controller('angularTodoC', ['$scope', function ($scope) {
    // define list of items
    $scope.items = [];

    // Write code to push new item

    $scope.submitNewItem = function (item) {
        $scope.items.push({name: item.name, completed: false});
        item.name = "";

    };

    // Write code to complete item
    $scope.completeItem = function (index) {
        $scope.items[index].completed = true;
    };

    // Write code to delete item

    $scope.deleteItem = function (index) {
        $scope.items.splice(index, 1);
    };
}]);