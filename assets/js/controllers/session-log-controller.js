app.controller('SessionLogController',
  ['$scope', '$sailsSocket', '$log', '$location',
    function($scope, $sailsSocket, $log, $location, $window) {
      var sessionId = $location.path().split('/').pop();

      $scope.$on('session:init', function(event, session) {
        $scope.messages = session.messages;
      });

      $scope.$on('chat:message', function(event, message) {
        $scope.messages.push(message);
      });

      $scope.send = function(message) {
        if (message.body) {
          $scope.$emit('chat:message:send', angular.extend({}, message, {
            type: 'message:' + (message.ooc ? 'ooc' : 'ic'),
          }));

          $scope.message.body = '';
        }
      };
    }
  ]
);
