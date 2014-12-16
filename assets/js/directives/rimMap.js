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

          $scope.square = 32;

          $scope.size = 50;

          $scope.zoom = 1;

          $scope.width = $scope.square * $scope.size + 1;
          $scope.height = $scope.square * $scope.size + 1;

          $scope.innerWidth = $element.innerWidth();
          $scope.innerHeight = $element.innerHeight();

          $scope.maxLeft = -($scope.width - $scope.innerWidth + $scope.square);
          $scope.maxTop = -($scope.height - $scope.innerHeight + $scope.square);

          $scope.minLeft = $scope.square;
          $scope.minTop = $scope.square;

          var x = $scope.left = $scope.maxLeft / 2;
          var y = $scope.top = $scope.maxTop / 2;

          $scope.$watch('size', function() {
            $scope.width = $scope.square * $scope.size + 1;
            $scope.height = $scope.square * $scope.size + 1;

            $scope.maxLeft = -($scope.width - $scope.innerWidth + $scope.square);
            $scope.maxTop = -($scope.height - $scope.innerHeight + $scope.square);
          });

          $element.on('contextmenu', function(event) {
            if (!event.shiftKey) {
              event.preventDefault();
            }
          });

          $element.on('mousewheel', function(event) {
            $scope.$applyAsync(function() {
              x -= event.deltaX * 25;
              y += event.deltaY * 25;

              forceBounds();

              $scope.left = x;
              $scope.top = y;
            });
          });

          $element.on('mousedown', function(event) {
            event.preventDefault();

            startX = event.pageX - x;
            startY = event.pageY - y;

            switch (event.button) {
              case 0: // left
                draw(event);
                $document.on('mousemove', draw);
                $document.on('mouseup', drawEnd);
                break;

              case 2: // right
                $document.on('mousemove', drag);
                $document.on('mouseup', dragEnd);
                break;
            }
          });

          function drag(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;

            forceBounds();

            $element.css({
              cursor: 'move',
            });

            var _x = x;
            var _y = y;

            $scope.$applyAsync(function() {
              $scope.left = _x;
              $scope.top = _y;
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
            if (!event.target.parentNode.classList.contains('layer')) {
              var _x = Math.floor((-x + event.pageX) / $scope.square);
              var _y = Math.floor((-y + event.pageY) / $scope.square);

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

          function forceBounds() {
            if (x > $scope.minLeft) {
              x = $scope.minLeft;
            } else if (x < $scope.maxLeft) {
              x = $scope.maxLeft;
            }

            if (y > $scope.minTop) {
              y = $scope.minTop;
            } else if (y < $scope.maxTop) {
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
