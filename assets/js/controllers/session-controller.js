app.controller('SessionController',
  ['$scope', '$sailsSocket', '$log', '$location',
    function($scope, $sailsSocket, $log, $location, $window) {
      var sessionId = $location.path().split('/').pop();

      $sailsSocket
        .get($location.path())
        .success(function(session) {
          $scope.$broadcast('session:init', session);
          console.log(session);
        });

      $sailsSocket
        .subscribe('session', function(msg) {
          $scope.$broadcast(msg.data.origin, msg.data.content);
        });

      $scope.$on('chat:message:send', function(event, message) {
        $sailsSocket
          .post('/message', {
            session: sessionId,
            body: message.body,
            type: message.type,
          });
      });
    }
  ]
);
