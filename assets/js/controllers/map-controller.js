app.controller('MapController',
  ['$scope', 'Map',
    function($scope, Map) {
      var map = new Map();
      var layer = map.layers[0];

      $scope.map = map;

      $scope.layer = 0;

      var drawing;

      $scope.$watch('layer', function(newValue, oldValue) {
        var layer_ = map.layers[newValue];

        if (layer_) {
          layer = layer_;
        } else {
          $scope.layer = oldValue;
        }
      });

      $scope.$on('pendown', function(event, pen) {
        drawing = !layer.getPoint(pen.point);
      });

      $scope.$on('penup', function() {
        drawing = undefined;
      });

      $scope.$on('pen', function(event, pen) {
        $scope.$applyAsync(function() {
          var pointExists = !!layer.getPoint(pen.point);

          // drawing && !pointExists || !drawing && pointExists
          if (drawing != pointExists) {
            if (!drawing) {
              layer.removePoint(pen.point);
            } else {
              layer.addPoint({
                x: pen.x,
                y: pen.y,
              });
            }

            console.log(JSON.stringify(map));
          }
        });
      });
    }
  ]
);
