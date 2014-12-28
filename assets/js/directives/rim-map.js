app.directive('rimMap',
  ['$document', '$window',
    function($document, $window) {
      return {
        controller: 'MapController',
        scope: {},
        transclude: true,
        link: function($scope, $element, $attrs, $ctrl, $transclude) {
          var startX;
          var startY;
          var point;

          var element_ = $element.get(0);

          $scope.zoom = 32;

          $scope.width = 5;
          $scope.height = 5;

          $scope.maxLeft = $scope.width + 1 - (element_.clientWidth / $scope.zoom);
          $scope.maxTop = $scope.height + 1 - (element_.clientHeight / $scope.zoom);

          var x = $scope.left = $scope.maxLeft / 2;
          var y = $scope.top = $scope.maxTop / 2;

          $scope.$watch('width', function() {
            $scope.maxLeft = $scope.width + 1 - (element_.clientWidth / $scope.zoom);
            $scope.maxTop = $scope.height + 1 - (element_.clientHeight / $scope.zoom);

            x = $scope.left = $scope.maxLeft / 2;
            y = $scope.top = $scope.maxTop / 2;

            forceBounds();

            $scope.left = x;
            $scope.top = y;
          });

          $window.jQuery($window).on('resize', function() {
            $scope.$applyAsync(function() {
              $scope.maxLeft = $scope.width + 1 - (element_.clientWidth / $scope.zoom);
              $scope.maxTop = $scope.height + 1 - (element_.clientHeight / $scope.zoom);

              forceBounds();

              $scope.left = x;
              $scope.top = y;
            });
          });

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

            switch (event.button) {
              case 0: // left
                pendown(event);
                pen(event);
                $document.on('mousemove', pen);
                $document.on('mouseup', penup);
                break;

              case 2: // right
                startX = event.pageX / $scope.zoom + x;
                startY = event.pageY / $scope.zoom + y;
                $document.on('mousemove', drag);
                $document.on('mouseup', dragEnd);
                break;
            }
          });

          function penInBounds(pen) {
            return (pen.x >= 0 && pen.x < $scope.width &&
                    pen.y >= 0 && pen.y < $scope.height);
          }

          function pendown(event) {
            var pen = getXYFromPage(event.pageX, event.pageY);
            pen.point = getPoint(pen.x, pen.y);

            if (penInBounds(pen)) {
              point = -1;
              $scope.$broadcast('pendown', pen);
            }
          }

          /**
           * Map mousemove events to pen events on scope
           * @param {jQuery.Event} event
           */
          function pen(event) {
            var pen_ = getXYFromPage(event.pageX, event.pageY);
            pen_.point = getPoint(pen_.x, pen_.y);

            if (!angular.isUndefined(point) &&
                point != pen_.point && penInBounds(pen_)) {
              point = pen_.point;
              $scope.$broadcast('pen', pen_);
            }
          }

          /**
           * Unhook pen from mouse events
           */
          function penup() {
            if (!angular.isUndefined(point) && point >= 0) {
              var pen_ = getXY(point);
              pen_.point = point;

              $scope.$broadcast('pen_up', pen_);
            }

            point = undefined;

            $document.off('mousemove', pen);
            $document.off('mouseup', penup);
          }

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

          function forceBounds() {
            var maxLeft = $scope.maxLeft;
            var maxTop = $scope.maxTop;

            if (maxLeft <= -1) {
              x = maxLeft / 2;
            } else if (x < -1) {
              x = -1;
            } else if (x > maxLeft) {
              x = maxLeft;
            }

            if (maxTop <= -1) {
              y = maxTop / 2;
            } else if (y < -1) {
              y = -1;
            } else if (y > maxTop) {
              y = maxTop;
            }
          }


          /**
           * Converts an X/Y page coordinate to an X/Y map coordinate
           * @param {number} pageX  X coordinate on page
           * @param {number} pageY  Y coordinate on page
           * @return {{ x: number, y: number }}  Object containing x/y location
           */
          function getXYFromPage(pageX, pageY) {
            return {
              x: Math.floor(x + pageX / $scope.zoom),
              y: Math.floor(y + pageY / $scope.zoom),
            };
          }


          /**
           * Converts an X/Y map coordinate to a point reference
           * @param {number} x  X coordinate on map
           * @param {number} y  Y coordinate on map
           * @return {number}  Point reference
           */
          function getPoint(x, y) {
            return x + y * $scope.width;
          }


          /**
           * Converts a point reference to an X/Y map coordinate
           * @param {number} point  Point in array
           * @return {{ x: number, y: number }}  Object containing x/y location
           */
          function getXY(point) {
            return {
              x: point % $scope.width,
              y: Math.trunc(point / $scope.height),
            };
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
