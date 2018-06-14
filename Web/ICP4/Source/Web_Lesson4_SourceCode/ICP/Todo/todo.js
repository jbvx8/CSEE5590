var angularTodo = angular.module('angularTodo', []);

angularTodo.controller('angularTodoC', ['$scope', function ($scope) {
    // define list of items
    $scope.items = [];
    $scope.pending = 0;
    $scope.completed = 0;

    // Write code to push new item

    $scope.submitNewItem = function (item) {
        $scope.items.push({name: item.name, completed: false});
        item.name = "";
        $scope.pending++;

    };

    // Write code to complete item
    $scope.completeItem = function (index) {
        // can flip to uncheck in case it was a mistake
        $scope.items[index].completed = !$scope.items[index].completed;
        if ($scope.items[index].completed == true) {
            $scope.completed++;
            $scope.pending--;
        } else {
            $scope.completed--;
            $scope.pending++;
        }
    };

    // Write code to delete item

    $scope.deleteItem = function (index) {
        if ($scope.items[index].completed == true) {
            $scope.completed--;
        } else {
            $scope.pending--;
        }
        $scope.items.splice(index, 1);
    };
}]);