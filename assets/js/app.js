var app = angular.module('RPGim', ['sails.io']);

app.config(function($locationProvider, $sailsSocketProvider) {
  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false,
    });
});
