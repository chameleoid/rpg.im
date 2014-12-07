var app = angular.module('RPGim', ['sails.io']);

app.config(['$locationProvider', '$sailsSocketProvider',
    function($locationProvider, $sailsSocketProvider) {
      $locationProvider
        .html5Mode({
          enabled: true,
          requireBase: false,
        });
    }]);
