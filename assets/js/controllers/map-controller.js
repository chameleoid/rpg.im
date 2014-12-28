app.controller('MapController',
  ['$scope', 'Map',
    function($scope, Map) {
      var drawing, map, layer;

      $scope.$on('session:init', function(event, session) {
        var data = angular.extend({ id: session.map.id }, session.map.data);

        $scope.$applyAsync(function() {
          $scope.map = map = new Map(data);
          layer = map.layers[0];
          $scope.layer = 0;
          $scope.width = map.width;
          $scope.height = map.height;
        });
      });

      $scope.$watch('layer', function(newValue, oldValue) {
        if (!map) {
          return;
        }

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
          var point = pen.point;

          // drawing && !pointExists || !drawing && pointExists
          if (drawing != pointExists) {
            if (!drawing) {
              layer.removePoint(point);
            } else {
              point = layer.addPoint({
                x: pen.x,
                y: pen.y,
              });
            }

            $scope.$emit('map:update', map);

            $scope.$emit('map:point:' + (drawing ? 'add' : 'remove'), {
              layer: $scope.layer,
              point: point,
            });
          }
        });
      });
    }
  ]
);
