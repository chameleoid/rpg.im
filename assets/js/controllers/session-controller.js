app.controller('SessionController',
  ['$scope', '$sailsSocket', '$log', '$location',
    function($scope, $sailsSocket, $log, $location) {
      var sessionId = $location.path().split('/').pop();

      $sailsSocket
        .get($location.path())
        .success(function(session) {
          $scope.$broadcast('session:init', session);
        });

      $sailsSocket
        .subscribe('session', function(msg) {
          $scope.$broadcast(msg.data.origin, msg.data.content);
        });

      $sailsSocket
        .subscribe('map', function(msg) {
          var newMap = JSON.parse(msg.data.data).layers[0].data;
          var oldMap = msg.previous.data.layers[0].data;
          var diff = {};

          Object.keys(oldMap).forEach(function(key) {
            if (typeof newMap[key] == 'undefined') {
              diff[key] = null;
            } else {
              delete newMap[key];
            }
          });

          Object.keys(newMap).forEach(function(key) {
            diff[key] = newMap[key];
          });

          $scope.$broadcast('map:diff', diff);
        });

      $scope.$on('chat:message:send', function(event, message) {
        $sailsSocket
          .post('/message', {
            session: sessionId,
            body: message.body,
            type: message.type,
          });
      });

      $scope.$on('map:update', function(event, map) {
        $sailsSocket
          .put('/map/' + map.id, {
            data: JSON.stringify(map),
          });
      });
    }
  ]
);
