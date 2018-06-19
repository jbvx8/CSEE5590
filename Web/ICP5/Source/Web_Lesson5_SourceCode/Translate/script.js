angular.module('TranslateApp', [])
    .controller('translateCtrl', function ($scope, $http) {
        $scope.translate = function () {
            var input = document.getElementById("textInput").value;
            var language = document.getElementById("lang").value;

            if (input != null && input != "" && language != null && language != "") {
                var handler = $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate" +
                "?key=trnsl.1.1.20180619T042600Z.3f14426a3b79dc8f.9e86e4a1fc3a60bc9c3d6d877a96130a2cb3c077" +
                "&text=" + input +
                "&lang=" + language);

                handler.success(function (data) {
                    if (data != null && data.text.length > 0) {
                        $scope.output = data.text[0];
                    }
                });

                handler.error(function (data) {
                    alert("There was a problem with your request.  Please try again after some time.");
                });
            }
        }
    });
