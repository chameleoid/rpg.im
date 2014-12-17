app.directive('rimMap',
  ['$document',
    function($document) {
      return {
        controller: 'MapController',
        $scope: {},
        $transclude: true,
        link: function($scope, $element, $attrs, $ctrl, $transclude) {
          var startX;
          var startY;

          var element_ = $element.get(0);

          $scope.zoom = 32;

          $scope.width = 50;
          $scope.height = 50;

          $scope.maxLeft = $scope.width + 1 - (element_.clientWidth / $scope.zoom);
          $scope.maxTop = $scope.height + 1 - (element_.clientHeight / $scope.zoom);

          var x = $scope.left = $scope.maxLeft / 2;
          var y = $scope.top = $scope.maxTop / 2;

          $element.on('contextmenu', function(event) {
            if (!event.shiftKey) {
              event.preventDefault();
            }
          });

          $element.on('mousewheel', function(event) {
            $scope.$applyAsync(function() {
              x += event.deltaX * (25 / $scope.zoom);
              y -= event.deltaY * (25 / $scope.zoom);

              forceBounds();

              $scope.left = x;
              $scope.top = y;
            });
          });

          $element.on('mousedown', function(event) {
            event.preventDefault();

            startX = event.pageX / $scope.zoom + x;
            startY = event.pageY / $scope.zoom + y;

            switch (event.button) {
              case 0: // left
                var _x = Math.floor(x + event.pageX / $scope.zoom);
                var _y = Math.floor(y + event.pageY / $scope.zoom);

                if (!$scope.layers[0].data[_x + ':' + _y]) {
                  draw(event);
                  $document.on('mousemove', draw);
                  $document.on('mouseup', drawEnd);
                } else {
                  erase(event);
                  $document.on('mousemove', erase);
                  $document.on('mouseup', eraseEnd);
                }
                break;

              case 2: // right
                $document.on('mousemove', drag);
                $document.on('mouseup', dragEnd);
                break;
            }
          });

          function drag(event) {
            y = startY - event.pageY / $scope.zoom;
            x = startX - event.pageX / $scope.zoom;

            forceBounds();

            $element.css({
              cursor: 'move',
            });

            $scope.$applyAsync(function() {
              $scope.left = x;
              $scope.top = y;
            });
          }

          function dragEnd() {
            $element.css({
              cursor: 'default',
            });

            $document.off('mousemove', drag);
            $document.off('mouseup', dragEnd);
          }

          function draw(event) {
            var _x = Math.floor(x + event.pageX / $scope.zoom);
            var _y = Math.floor(y + event.pageY / $scope.zoom);

            if (!$scope.layers[0].data[_x + ':' + _y]) {
              $scope.$apply(function() {
                $scope.layers[0].data[_x + ':' + _y] = {
                  type: 'wall',
                  x: _x,
                  y: _y,
                };
              });
            }
          }

          function drawEnd() {
            $document.off('mousemove', draw);
            $document.off('mouseup', drawEnd);
          }

          function erase(event) {
            var _x = Math.floor(x + event.pageX / $scope.zoom);
            var _y = Math.floor(y + event.pageY / $scope.zoom);

            if ($scope.layers[0].data[_x + ':' + _y]) {
              $scope.$apply(function() {
                delete $scope.layers[0].data[_x + ':' + _y];
              });
            }
          }

          function eraseEnd() {
            $document.off('mousemove', erase);
            $document.off('mouseup', eraseEnd);
          }

          function forceBounds() {
            if (x < -1) {
              x = -1;
            } else if (x > $scope.maxLeft) {
              x = $scope.maxLeft;
            }

            if (y < -1) {
              y = -1;
            } else if (y > $scope.maxTop) {
              y = $scope.maxTop;
            }
          }

          // Transclude elements from template, so they're in our scope, rather
          // than the parent scope.  I don't really like this, but it seems to
          // get the job done well enough that I'll use it.
          $transclude($scope, function(clone) {
            $element.append(clone);
          });
        },
      };
    }
  ]
);
