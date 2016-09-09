'use strict';

angular.module('channels', ['ngTable']);

//Routers
myApp.config(function ($stateProvider) {

    //Search Customers
    $stateProvider.state('channels', {
        url: '/channels',
        templateUrl: 'partials/channel/channels.html',
        data: {
            auth: true
        }
    });

    //Add Channel
    $stateProvider.state('addChannel', {
        url: '/addChannel',
        templateUrl: 'partials/channel/addChannel.html',
        data: {
            auth: true
        }
    });

    //Category Tab
    $stateProvider.state('channel', {
        url: '',
        abstract: true,
        templateUrl: 'partials/channel/channelTab.html',
        data: {
            auth: true
        }
    });

    //View Category
    $stateProvider.state('channel.view', {
        url: "/channel/view/{id}",
        views: {
            "viewChannel": {
                templateUrl: "partials/channel/viewChannel.html",
                controller: 'viewChannelController'
            }
        },
        resolve: {
            channelResolved: function (channelServices, $stateParams) {
                return channelServices.getChannel($stateParams.id);
            }
        },
        data: {
            auth: true
        }
    });

    //Edit Category
    $stateProvider.state('channel.edit', {
        url: "/channel/edit/{id}",
        views: {
            "editChannel": {
                templateUrl: "partials/channel/editChannel.html",
                controller: 'editChannelController'
            }
        },
        resolve: {
            channelResolved: function (channelServices, $stateParams) {
                return channelServices.getChannel($stateParams.id);
            }
        },
        data: {
            auth: true
        }
    });

});

//Factories
myApp.factory('channelServices', ['$http', function ($http) {

        var factoryDefinitions = {
            categoryAll: function () {
                var promise = $http({
                    url: 'services/category-list',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
                return promise;
            },
            getChannels: function () {
                var promise = $http({
                    url: 'services/channel-list',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
                return promise;
            },
            addChannel: function (channelReq) {
               
                var promise = $http({
                    url: 'services/add-channel',
                    method: "POST",
                    headers: {'Content-Type': 'multipart/form-data'},
                    data: channelReq                    
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
                return promise;
            },
            getChannel: function (chId) {
                var promise = $http({
                    url: 'services/get-channel/',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    data: {pk_ch_id: chId}
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
                return promise;
            },
            updateChannel: function (categoryReq) {
                var promise = $http({
                    url: 'services/update-category',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    data: categoryReq
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
                return promise;
            },
        }

        return factoryDefinitions;
    }
]);

myApp.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

//Controllers
myApp.controller('getChannelsController', ['$scope', 'channelServices', 'dataTable', 'Flash', function ($scope, channelServices, dataTable, Flash) {
        channelServices.getChannels().then(function (result) {
            $scope.data = result.data;
            if (!result.data.error) {
                dataTable.render($scope, '', "channelsList", result.data.channel_lists);
            }
        });
        channelServices.categoryAll().then(function (result) {
            $scope.data = result.data;
            if (!result.data.error) {
                $scope.categorylist = result.data.category_lists;
            }
        });
    }]);


myApp.controller('addChannelController', ['$scope', 'channelServices', '$location', 'Flash', function ($scope, channelServices, $location, Flash) {
        $scope.error_msg = "false";
        $scope.addChannel = function () {
            if ($scope.addChannelForm.$valid) {                
                channelServices.addChannel($scope.channel).then(function (result) {
                    if (result.data.status == 1) {
                        var message = result.data.msg;
                        Flash.create('success', message);
                        $location.path("/channels");
                    }
                    else
                    {
                        var message = result.data.msg;
                        Flash.create('danger', message);
                    }
                });
            }
        }

        channelServices.categoryAll().then(function (result) {
            $scope.data = result.data;
            if (!result.data.error) {
                $scope.categorylist = result.data.category_lists;
                console.log($scope.categorylist);
            }
        });


        $scope.cancel = function () {
            $location.path("/channels");
        }
    }]);


myApp.controller('viewChannelController', ['$scope', 'channelResolved', function ($scope, channelResolved) {
        $scope.viewChannel = channelResolved.data;
    }]);

myApp.controller('editChannelController', ['$scope', 'channelResolved', 'channelServices', '$location', '$state', 'Flash', function ($scope, channelResolved, channelServices, $location, $state, Flash) {
        $scope.channel = channelResolved.data;

        $scope.updateChannel = function () {
            if ($scope.editChannelForm.$valid) {
                channelServices.updateChannel($scope.channel).then(function (result) {
                    $scope.data = result.data;
                    if (result.data.status == 1) {
                        var message = result.data.msg;
                        Flash.create('success', message);
                        $location.path("/channels");
                    }
                    else
                    {
                        var message = result.data.msg;
                        Flash.create('danger', message);
                    }
                });
            }
        };
        channelServices.categoryAll().then(function (result) {
            $scope.data = result.data;
            if (!result.data.error) {
                $scope.categorylist = result.data.category_lists;
            }
        });

        $scope.cancel = function () {
            $location.path("/channels");
        }
    }]);

 