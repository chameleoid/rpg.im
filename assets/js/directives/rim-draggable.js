app.directive('rimDraggable',
  ['$document', '$window',
    function($document, $window) {
      return {
        link: function(scope, element, attrs) {
          var startX = 0;
          var startY = 0;

          var width = element.outerWidth();
          var height = element.outerHeight();

          var offset = element.offset();

          var x = offset.left;
          var y = offset.top;

          element.on('mousedown', function(event) {
            event.preventDefault();

            width = element.outerWidth();
            height = element.outerHeight();

            startX = event.pageX - x;
            startY = event.pageY - y;

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
          });

          $window.jQuery($window).on('resize', function() {
            var ev = {
              pageX: 0,
              pageY: 0,
            };

            element
              .trigger(angular.extend(ev, { type: 'mousedown' }))
              .trigger(angular.extend(ev, { type: 'mousemove' }))
              .trigger(angular.extend(ev, { type: 'mouseup' }));
          });

          function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;

            if (x < 0) {
              x = 0;
            } else if (x > $window.innerWidth - width) {
              x = $window.innerWidth - width;
            }

            if (y < 0) {
              y = 0;
            } else if (y > $window.innerHeight - height) {
              y = $window.innerHeight - height;
            }

            element.css({
              top: y,
              left: x,
              cursor: 'move',
            });
          }

          function mouseup() {
            element.css({
              cursor: 'default',
            });

            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
          }
        },
      };
    }
  ]
);
