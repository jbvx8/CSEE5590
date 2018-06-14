var CalculatorApp = angular.module('CalculatorApp', []);

CalculatorApp.controller('CalculatorController', ['$scope', function ($scope) {
    $scope.expression = {number: "", operator: "", string: ""};
    // Write code simple calculator operations
    $scope.evaluate = function(expression){
        // var a = parseInt(expression.a);
        // var b = parseInt(expression.b);
        // if (expression.operator == "+") {
        //     document.getElementById("output").value = a + b;
        // } else if (expression.operator == "-") {
        //     document.getElementById("output").value = a - b;
        // } else if (expression.operator == "*") {
        //     document.getElementById("output").value = a * b;
        // } else {
        //     document.getElementById("output").value = a / b;
        // }
        // expression.a = '';
        // expression.b = '';

        var splitString = $scope.expression.number.split(" ");
        var a= parseInt(splitString[0]);
        var b = parseInt(splitString[1]);

        if ($scope.expression.operator == "+") {
            document.getElementsByName("calculate")[0].value = a + b;
        } else if ($scope.expression.operator == "-") {
            document.getElementsByName("calculate")[0].value = a - b;
        } else if ($scope.expression.operator == "*") {
            document.getElementsByName("calculate")[0].value = a * b;
        } else {
            document.getElementsByName("calculate")[0].value = a / b;
        }
        $scope.expression.number = "";
        $scope.expression.operator = "";
    }

    $scope.enterOperator = function(operator) {
        $scope.expression.number += " ";
        $scope.expression.operator += operator;
        $scope.expression.string += operator;
    }

    $scope.update = function(number) {
        $scope.expression.number += number;
        $scope.expression.string += number;
    }

    $scope.clear = function() {
        $scope.expression = {number: "", operator: "", string: ""};
    }
 }]);