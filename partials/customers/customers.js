'use strict';

angular.module('customers', ['ngTable']);

//Routers
myApp.config(function ($stateProvider) {

    //Search Customers
    $stateProvider.state('customers', {
        url: '/customers',
        templateUrl: 'partials/customers/customers.html',
        data: {
            auth: true
        }
    });

    //Add Customer
    $stateProvider.state('addCustomer', {
        url: '/addCustomer',
        templateUrl: 'partials/customers/addCustomer.html',
        data: {
            auth: true
        }
    });

    //Customer Tab
    $stateProvider.state('customer', {
        url: '',
        abstract: true,
        templateUrl: 'partials/customers/customerTab.html',
        data: {
            auth: true
        }
    });

    //View customer
    $stateProvider.state('customer.view', {
        url: "/view/{id}",
        views: {
            "viewCustomer": {
                templateUrl: "partials/customers/viewCustomer.html",
                controller: 'viewCustomerController'
            }
        },
        resolve: {
            customerResolved: function (customerServices, $stateParams) {
                return customerServices.getCustomer($stateParams.id);
            }
        },
        data: {
            auth: true
        }
    });

    //Edit customer
    $stateProvider.state('customer.edit', {
        url: "/edit/{id}",
        views: {
            "editCustomer": {
                templateUrl: "partials/customers/editCustomer.html",
                controller: 'editCustomerController'
            }
        },
        resolve: {
            customerResolved: function (customerServices, $stateParams) {
                return customerServices.getCustomer($stateParams.id);
            }
        },
        data: {
            auth: true
        }
    });

});

//Factories
myApp.factory('customerServices', ['$http', function ($http) {

        var factoryDefinitions = {
            getCustomers: function () {
                var promise = $http({
                    url: 'services/customer-list',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
                return promise;                
            },
            addCustomer: function (customerReq) {
                var promise = $http({
                    url: 'services/add-customer',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    data: customerReq
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
                return promise;
//                return $http.post('partials/common/mock/success.json', customerReq).success(function (data) {
//                    return data;
//                });
            },
            getCustomer: function (customerId) {
                var promise = $http({
                    url: 'services/get-customer/',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    data:{pk_cust_id:customerId}
                }).success(function (data) {                    
                    return data;
                }).error(function (data) {                    
                    return data;
                });
                return promise
                //return $http.get('partials/customers/mock/get_customer.json?id=' + customerId).success(function(data) { return data; });
            },
            updateCustomer: function (customerReq) {
                var promise = $http({
                    url: 'services/update-customer',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    data: customerReq
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
myApp.controller('getCustomersController', ['$scope', 'customerServices', 'dataTable', 'Flash', function ($scope, customerServices, dataTable, Flash) {
        customerServices.getCustomers().then(function (result) {
            $scope.data = result.data;
            if (!result.data.error) {
                dataTable.render($scope, '', "customerstList", result.data.user_list);
            }
        });
    }]);

myApp.controller('addCustomerController', ['$scope', 'customerServices', '$location','Flash', function ($scope, customerServices, $location,Flash) {
        $scope.error_msg = "false";
        $scope.addCustomer = function () {
            if ($scope.addCustomerForm.$valid) {
                customerServices.addCustomer($scope.customer).then(function (result) {
                    if (result.data.status == 1) {
                        var message =result.data.msg;
                        Flash.create('success', message);
                        $location.path("/customers");
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
            $location.path("/customers");
        }
    }]);

myApp.controller('viewCustomerController', ['$scope', 'customerResolved', function ($scope, customerResolved) {
        $scope.viewCustomer = customerResolved.data;
    }]);

myApp.controller('editCustomerController', ['$scope', 'customerResolved', 'customerServices', '$location', '$state','Flash', function ($scope, customerResolved, customerServices, $location, $state,Flash) {
        $scope.customer = customerResolved.data;

        $scope.updateCustomer = function () {
            if ($scope.editCustomerForm.$valid) {
                customerServices.updateCustomer($scope.customer).then(function (result) {
                    $scope.data = result.data;
                    if (result.data.status == 1) {
                        var message =result.data.msg;
                        Flash.create('success', message);
                        $location.path("/customers");
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
            $location.path("/customers");
        }
    }]);