app.controller('MapController',
  ['$scope', 'Map',
    function($scope, Map) {
      $scope.layers = Map.query();

      $scope.token = 'wall';

      $scope.draw = function(x, y) {
        Layer.addToken($scope.token, x, y);
      };

      $scope.tokens = {};
      $scope.tokens.wall = {
        type: 'wall',
        repeatable: false,
        solid: true,
      };
    }
  ]
);
