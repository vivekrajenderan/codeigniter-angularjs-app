'use strict';

angular.module('categories', ['ngTable']);



//Routers
myApp.config(function ($stateProvider) {

    //Search Categories
    $stateProvider.state('categories', {
        url: '/category',
        templateUrl: 'partials/category/categories.html',
        data: {
            auth: true
        }
    });
    
    //Add Category
    $stateProvider.state('addCategory', {
        url: '/addCategory',
        templateUrl: 'partials/category/addCategory.html',
        data: {
            auth: true
        }
    });
    
    //Category Tab
    $stateProvider.state('category', {
        url: '',
        abstract: true,
        templateUrl: 'partials/category/categoryTab.html',
        data: {
            auth: true
        }
    });

    //View Category
    $stateProvider.state('category.view', {
        url: "/category/view/{id}",
        views: {
            "viewCategory": {
                templateUrl: "partials/category/viewCategory.html",
                controller: 'viewCategoryController'
            }
        },
        resolve: {
            categoryResolved: function (categoryServices, $stateParams) {
                return categoryServices.getCategory($stateParams.id);
            }
        },
        data: {
            auth: true
        }
    });

    //Edit Category
    $stateProvider.state('category.edit', {
        url: "/category/edit/{id}",
        views: {
            "editCategory": {
                templateUrl: "partials/category/editCategory.html",
                controller: 'editCategoryController'
            }
        },
        resolve: {
            categoryResolved: function (categoryServices, $stateParams) {
                return categoryServices.getCategory($stateParams.id);
            }
        },
        data: {
            auth: true
        }
    });

});

//Factories
myApp.factory('categoryServices', ['$http', function ($http) {

        var factoryDefinitions = {
            getCategories: function () {
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
            addCategory: function (categoryReq) {
                var promise = $http({
                    url: 'services/add-category',
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
            getCategory: function (catId) {
                var promise = $http({
                    url: 'services/get-category/',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    data:{pk_cat_id:catId}
                }).success(function (data) {                    
                    return data;
                }).error(function (data) {                    
                    return data;
                });
                return promise;                
            },
            updateCategory: function (categoryReq) {
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

//Controllers
myApp.controller('getCategoriesController', ['$scope', 'categoryServices', 'dataTable', 'Flash', function ($scope, categoryServices, dataTable, Flash) {
        categoryServices.getCategories().then(function (result) {
            $scope.data = result.data;
            if (!result.data.error) {
                dataTable.render($scope, '', "categoriesList", result.data.category_lists);
            }
        });
    }]);

myApp.controller('addCategoryController', ['$scope', 'categoryServices', '$location','Flash', function ($scope, categoryServices, $location,Flash) {
        $scope.error_msg = "false";
        $scope.addCategory = function () {
            if ($scope.addCategoryForm.$valid) {
                categoryServices.addCategory($scope.category).then(function (result) {
                    if (result.data.status == 1) {
                        var message =result.data.msg;
                        Flash.create('success', message);
                        $location.path("/category");
                    }
                    else
                    {
                        var message =result.data.msg;
                        Flash.create('danger', message);                        
                    }
                });
            }
        }

        $scope.cancel = function () {
            $location.path("/category");
        }
    }]);



myApp.controller('viewCategoryController', ['$scope', 'categoryResolved', function ($scope, categoryResolved) {
        $scope.viewCategory = categoryResolved.data;
    }]);

myApp.controller('editCategoryController', ['$scope', 'categoryResolved', 'categoryServices', '$location', '$state','Flash', function ($scope, categoryResolved, categoryServices, $location, $state,Flash) {
        $scope.category = categoryResolved.data;

        $scope.updateCategory = function () {
            if ($scope.editCategoryForm.$valid) {
                categoryServices.updateCategory($scope.category).then(function (result) {
                    $scope.data = result.data;
                    if (result.data.status == 1) {
                        var message =result.data.msg;
                        Flash.create('success', message);
                        $location.path("/category");
                    }
                    else
                    {
                        var message =result.data.msg;
                        Flash.create('danger', message);                        
                    }
                });
            }
        };

        $scope.cancel = function () {
            $location.path("/category");
        }
    }]);