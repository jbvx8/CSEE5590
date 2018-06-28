
// var app = angular.module('wikiApp', []);
//
// app.factory('wikiAPI', function ($http) {
//     var wikiURI = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=JSON_CALLBACK&gsrsearch=';
//
//     return function (text) {
//         return $http.jsonp(wikiURI + encodeURIComponent(text));
//     };
// });
//
// app.factory('linksAPI', function($http) {
//     var URI = 'http://en.wikipedia.org/w/api.php?&format=json&action=query&prop=links&callback=JSON_CALLBACK&titles=';
//     var headers = {"Api-User-Agent": "myWikiApp, jbvx8@mail.umkc.edu"};
//
//     return function (text) {
//         return $http.jsonp(URI + encodeURIComponent(text), {headers: headers});
//     }
//
// })
//
// app.controller('WikiCtrl', function($scope, wikiAPI, linksAPI) {
//     // var wikiURI = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=JSON_CALLBACK&gsrsearch=';
//     $scope.pageTitle = "";
//     $scope.links = [];
//
//     $scope.search = function() {
//         wikiAPI(($scope.searchText)).success(function(data) {
//             var pages = data.query.pages;
//             var pageKey = Object.keys(pages)[0];
//             $scope.pageTitle = pages[pageKey].title;
//
//             if ($scope.pageTitle != "") {
//                 $scope.links = getLinks($scope.pageTitle);
//             }
//
//         });
//     }
//
//     function getLinks(title) {
//         var linksArray = [];
//         linksAPI(title).success(function(data) {
//
//             var pages = data.query.pages;
//             var pageKey = Object.keys(pages)[0];
//             var linksJSON = pages[pageKey].links;
//
//             angular.forEach(linksJSON, function (link) {
//                 linksArray.push(link.title);
//             });
//
//             return linksArray;
//         }).catch(function (data) {
//             var error = data;
//         })
//
//
//     }
// });


var app = angular.module('twitterApp', [])
    .config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://api.twitter.com/**'
        ])
    });

    app.run(function ($http) {
        // Add CORS header
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    })

    app.controller('TwitterCtrl', function($scope, $http) {
        // var response = getToken();
        // var token = "";
        //
        // function getToken() {
        //     var config = {
        //         params: {
        //             grant_type: "client_credentials",
        //             // jsonpCallbackParam: "callback"
        //         },
        //         // method: "POST",
        //         // data: "grant_type=client_credentials",
        //         headers: {
        //             "Authorization": "Basic " + getTwitterKey(),
        //             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        //             "Api-User-Agent": "MyTwitterApp"
        //         }
        //     };
        //     $http.post("https://api.twitter.com/oauth2/token", "", config)
        //         .then(function(response) {
        //             console.log(response);
        //             if (response.status == 200) {
        //                 alert(response.data.access_token);
        //         } else {
        //             alert("fail");              }
        //     });
        // }

        $scope.getFriends = function(screenName) {
            var req = $http.get('http://127.0.0.1:8081/getFriends/' + screenName)
                .then(function (data) {
                    $scope.friendsList = data.data;
                    var tree = getFriendTree(data.data, screenName);
                    buildTree(tree);
                })
        };

        var getFriendTree = function(arr, root) {
            var jsonTree = { "name" : root, "children" : [] };
            angular.forEach(arr, function(friend) {
                jsonTree.children.push({"name": friend.screen_name });
            });
            return jsonTree;
        };

        var buildTree = function(treeJSON) {
            var margin = {top: 20, right: 120, bottom: 20, left: 120},
                width = 960 - margin.right - margin.left,
                height = 800 - margin.top - margin.bottom;

            var i = 0,
                duration = 750,
                root;

            var tree = d3.layout.tree()
                .size([height, width]);

            var diagonal = d3.svg.diagonal()
                .projection(function(d) { return [d.y, d.x]; });

            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.json(treeJSON, function(error) {
                if (error) throw error;

                root = treeJSON;
                root.x0 = height / 2;
                root.y0 = 0;

                function collapse(d) {
                    if (d.children) {
                        d._children = d.children;
                        d._children.forEach(collapse);
                        d.children = null;
                    }
                }

                root.children.forEach(collapse);
                update(root);
            });

            d3.select(self.frameElement).style("height", "800px");

            function update(source) {

                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);

                // Normalize for fixed-depth.
                nodes.forEach(function(d) { d.y = d.depth * 180; });

                // Update the nodes…
                var node = svg.selectAll("g.node")
                    .data(nodes, function(d) { return d.id || (d.id = ++i); });

                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                    .on("click", click);

                nodeEnter.append("circle")
                    .attr("r", 1e-6)
                    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

                nodeEnter.append("text")
                    .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                    .text(function(d) { return d.name; })
                    .style("fill-opacity", 1e-6);

                // Transition nodes to their new position.
                var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

                nodeUpdate.select("circle")
                    .attr("r", 4.5)
                    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

                nodeUpdate.select("text")
                    .style("fill-opacity", 1);

                // Transition exiting nodes to the parent's new position.
                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                    .remove();

                nodeExit.select("circle")
                    .attr("r", 1e-6);

                nodeExit.select("text")
                    .style("fill-opacity", 1e-6);

                // Update the links…
                var link = svg.selectAll("path.link")
                    .data(links, function(d) { return d.target.id; });

                // Enter any new links at the parent's previous position.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", function(d) {
                        var o = {x: source.x0, y: source.y0};
                        return diagonal({source: o, target: o});
                    });

                // Transition links to their new position.
                link.transition()
                    .duration(duration)
                    .attr("d", diagonal);

                // Transition exiting nodes to the parent's new position.
                link.exit().transition()
                    .duration(duration)
                    .attr("d", function(d) {
                        var o = {x: source.x, y: source.y};
                        return diagonal({source: o, target: o});
                    })
                    .remove();

                // Stash the old positions for transition.
                nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            // Toggle children on click.
            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }
        };


    });