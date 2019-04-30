/// <reference path="../Scripts/angular.js" />
/// <reference path="../Scripts/angular-route.js" />
/// <reference path="../Scripts/angular-cookies.js" />
/// <reference path="../Scripts/angular-animate.js" />
var myapp = angular.module('myapp', ['ngRoute', 'ngCookies', 'ngAnimate'])
            .config(function ($routeProvider, $locationProvider) {
                $routeProvider.caseInsensitiveMatch = true;
                $routeProvider.when("/home", {
                    templateUrl: "Templates/home.html",
                    controller: "homeController as homeCtrl"
                }).when("/readmore", {
                    templateUrl: "Templates/readmore.html",
                    controller: "readmoreController as readmoreCtrl"
                }).otherwise({
                    redirectTo: "/home"
                })
                $locationProvider.html5Mode(true);
            })
            .directive('validateEmail', function () {
                var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
                return {
                    link: function (scope, elm) {
                        elm.on("keyup", function () {
                            var isMatchRegex = EMAIL_REGEXP.test(elm.val());
                            if (isMatchRegex && elm.hasClass('warningg') || elm.val() == '') {
                                elm.addClass('sucem');
                                elm.removeClass('warningg');
                            } else if (isMatchRegex == false && !elm.hasClass('warningg')) {
                                elm.removeClass('sucem');
                                elm.addClass('warningg');
                            }
                        });
                    }
                }
            })
            .directive("fileInput", function ($parse) {
                return {
                    restrict: "A",
                    link: function (scope, elem, attrs) {
                        elem.bind("change", function () {
                            $parse(attrs.fileInput).assign(scope, elem[0].files);
                            scope.$apply();
                        });
                    }
                }
            })
            .factory('GetAllDatas', function ($http) {
                var obj = {};
                obj.fetchFreePicksDetails = function () {
                    return $http.get("../services/svFreePicks.asmx/GetAllFreePicks2_1");
                }
                obj.fetchUploadedProofs = function () {
                    return $http.get("../services/svImageProofs.asmx/GetAllImageProofs2_2");
                }
                obj.fetchUsers = function () {
                    return $http.get("../services/svUsers.asmx/GetAllUsers");
                }
                obj.fetchBlogCategoryDetails = function () {
                    return $http.get('../services/svBlogCategory.asmx/GetAllBlogCategory');
                }
                obj.fetchBlogPosts = function () {
                    return $http.get("../services/svBlogPosts.asmx/GetAllBlogPost");
                }
                return obj;
            })
            .service('user', function () {
                var username;
                var email;
                var password;
                var loggedin = false;
                var id;
                this.getName = function () { return username; };
                this.getEmail = function () { return email; };
                this.getPassword = function () { return password; };
                this.setID = function (ID) { id = ID; };
                this.getID = function () { return id; };
                this.saveData = function (data) {
                    username = data.UN;
                    id = data.GuidID;
                    email = data.Email;
                    password = data.Password;
                    loggedin = true;
                    localStorage.setItem('login', JSON.stringify({
                        username: username, id: id, password: password, email: email
                    }));
                };
                this.clearData = function () {
                    localStorage.removeItem('login');
                    username = "";
                    password = "";
                    id = "";
                    email = "";
                    loggedin = false;
                };
                this.isUserLoggedIn = function () {
                    if (!!localStorage.getItem('login')) {
                        loggedin = true;
                        var data = JSON.parse(localStorage.getItem('login'));
                        username = data.username;
                        email = data.email;
                        password = data.password;
                        id = data.id;
                    }
                    return loggedin;
                };
            })
            .controller('homeController', function ($scope, $window) {
                $scope.pageClass = "page-home";
                $scope.today = new Date();
                //$window.alert("i am working");
                //console.log("i am working");
            });