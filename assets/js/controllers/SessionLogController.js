app.controller('SessionLogController',
  ['$scope', '$sailsSocket', '$log', '$location',
    function($scope, $sailsSocket, $log, $location, $window) {
      var sessionId = $location.path().split('/').pop();

      $sailsSocket
        .get($location.path())
        .success(function(session) {
          $scope.messages = session.messages;
        });

      $sailsSocket
        .subscribe('session', function(msg) {
          switch (msg.data.origin) {
            case 'chat':
              $scope.messages.push(msg.data.content);
              break;
          }
        });

      $scope.send = function(message) {
        if (message.body) {
          var type = 'message:' + (message.ooc ? 'ooc' : 'ic');

          $sailsSocket
            .post('/message', {
              session: sessionId,
              body: message.body,
              type: type,
            });

          $scope.message.body = '';
        }
      };
    }
  ]
);
