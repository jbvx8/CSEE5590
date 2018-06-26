
var app = angular.module('wikiApp', []);

app.factory('wikiAPI', function ($http) {
    var wikiURI = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=JSON_CALLBACK&gsrsearch=';

    return function (text) {
        return $http.jsonp(wikiURI + encodeURIComponent(text));
    };
});

app.factory('linksAPI', function($http) {
    var URI = 'http://en.wikipedia.org/w/api.php?&format=json&action=query&prop=links&callback=JSON_CALLBACK&titles=';
    var headers = {"Api-User-Agent": "myWikiApp, jbvx8@mail.umkc.edu"};

    return function (text) {
        return $http.jsonp(URI + encodeURIComponent(text), {headers: headers});
    }

})

app.controller('WikiCtrl', function($scope, wikiAPI, linksAPI) {
    // var wikiURI = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=JSON_CALLBACK&gsrsearch=';
    $scope.pageTitle = "";
    $scope.links = [];

    $scope.search = function() {
        wikiAPI(($scope.searchText)).success(function(data) {
            var pages = data.query.pages;
            var pageKey = Object.keys(pages)[0];
            $scope.pageTitle = pages[pageKey].title;

            if ($scope.pageTitle != "") {
                $scope.links = getLinks($scope.pageTitle);
            }

        });
    }

    function getLinks(title) {
        var linksArray = [];
        linksAPI(title).success(function(data) {

            var pages = data.query.pages;
            var pageKey = Object.keys(pages)[0];
            var linksJSON = pages[pageKey].links;

            angular.forEach(linksJSON, function (link) {
                linksArray.push(link.title);
            });

            return linksArray;
        }).catch(function (data) {
            var error = data;
        })


    }
});


// angular.module('twitterApp', [])
//     .controller('TwitterCtrl', function($scope, $http) {
//         var response = getToken();
//         var token = "";
//
//         function getToken() {
//             $http({
//                 method: "POST",
//                 url: "https://api.twitter.com/oauth2/token",
//                 data: "grant_type=client_credentials",
//                 headers: {
//                     "Authorization": "Basic " + getTwitterKey(),
//                     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//                     "Api-User-Agent": "MyTwitterApp"
//                 }
//             }).then(function(response) {
//                 console.log(response);
//                 if (response.status == 200) {
//                     alert(response.data.access_token);
//                 } else {
//                     alert("fail");              }
//             });
//         }
//     });