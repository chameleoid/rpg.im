var app = angular.module('rimApp', ['sails.io']);

app.config(
  ['$locationProvider', '$sailsSocketProvider',
    function($locationProvider, $sailsSocketProvider) {
      $locationProvider
        .html5Mode({
          enabled: true,
          requireBase: false,
        });
    }
  ]
);
