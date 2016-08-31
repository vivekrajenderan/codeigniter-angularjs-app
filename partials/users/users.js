'use strict';
angular.module('users', []);

//Routers
myApp.config(function ($stateProvider) {

    //Login
    $stateProvider.state('login', {
        url: "/login",
        templateUrl: 'partials/users/login.html',
        controller: 'loginController'
    });

    //Signup
    $stateProvider.state('signup', {
        url: "/signup",
        templateUrl: 'partials/users/signup.html',
        controller: 'signupController'
    });

    //Logout
    $stateProvider.state('logout', {
        url: "/logout",
        template: "<h3>Logging out...</h3>",
        controller: 'logoutController'
    });

});

//Factories
myApp.factory('userServices', ['$http', function ($http) {

        var factoryDefinitions = {
            login: function (loginReq) {
                var promise = $http({
                    url: '/ajax-login',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    data: loginReq
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
                return promise;
            },
            signup: function (signupReq) {
                return $http.post('partials/common/mock/success.json', signupReq).success(function (data) {
                    return data;
                });
            }
        }

        return factoryDefinitions;
    }
]);

//Controllers
myApp.controller('loginController', ['$scope', 'userServices', '$location', '$rootScope', function ($scope, userServices, $location, $rootScope) {

        if (window.sessionStorage["userInfo"]) {           
            $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);
            $location.path("/dashboard");
        }
        else
        {           
            $location.path("/login");

        }


        $scope.login = {email: "admin@aadhar.com", password: "admin123"};

        $scope.doLogin = function () {
            $scope.error_msg = "false";
            $scope.ErrorMsg = "";
            if ($scope.loginForm.$valid) {
                userServices.login($scope.login, $rootScope).then(function (result) {
                    if (result.data.status == 1) {
                        window.sessionStorage["userInfo"] = JSON.stringify(result.data.msg);
                        $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);

                        //console.log($rootScope.userInfo[0].fname);return false;
                        $location.path("/dashboard");
                    }
                    else
                    {
                        $scope.error_msg = "true";
                        //var myEl = angular.element(document.querySelector( '#error_msg')).html(result.data.msg);
                        angular.element('#error_msg').html(result.data.msg);


                    }
                });
            }
        };
    }]);

myApp.controller('signupController', ['$scope', 'userServices', '$location', function ($scope, userServices, $location) {
        $scope.doSignup = function () {
            if ($scope.signupForm.$valid) {
                userServices.signup($scope.signup).then(function (result) {
                    $scope.data = result;
                    if (!result.error) {
                        $location.path("/login");
                    }
                });
            }
        }
    }]);

myApp.controller('logoutController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
        sessionStorage.clear();
        $rootScope.userInfo = false;
        $location.path("/login");
    }]);