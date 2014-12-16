app.controller('MapController',
  ['$scope', 'Map',
    function($scope, Map) {
      $scope.layers = Map.query();
    }
  ]
);
