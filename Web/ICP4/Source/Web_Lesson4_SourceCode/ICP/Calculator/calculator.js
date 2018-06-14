var CalculatorApp = angular.module('CalculatorApp', []);

CalculatorApp.controller('CalculatorController', ['$scope', function ($scope) {
    // Write code simple calculator operations
    $scope.evaluate = function(expression){
        var a = parseInt(expression.a);
        var b = parseInt(expression.b);
        if (expression.operator == "+") {
            document.getElementById("output").value = a + b;
        } else if (expression.operator == "-") {
            document.getElementById("output").value = a - b;
        } else if (expression.operator == "*") {
            document.getElementById("output").value = a * b;
        } else {
            document.getElementById("output").value = a / b;
        }
        expression.a = '';
        expression.b = '';
    }
}]);