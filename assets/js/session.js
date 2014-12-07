app.controller('SessionController', function($scope, $sailsSocket, $log, $location) {
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

      $log.log(msg);
    });

  $scope.send = function(message) {
    if (message.body) {
      $sailsSocket
        .post('/message', {
          session: sessionId,
          body: message.body,
        });

      $scope.message.body = '';
    }
  };
});

