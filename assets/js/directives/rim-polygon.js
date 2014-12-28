app.directive('rimPolygon', ['$filter', function($filter) {
  var rotation = {
    4: 45,
  };

  var pixelate_ = $filter('pixelate');

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var sides = +attrs.sides;
      var points = [];
      var attrs_ = { transform: 'translate(0.5 0.5)' };
      var a = 2 * Math.PI / sides;
      var r = 0.4;

      switch (sides) {
        case 3:
          r = 0.45;
          attrs_.transform = 'translate(0.5 ' + pixelate_(0.6) + ')';
          break;

        case 4:
          r = 0.5;
          attrs_['shape-rendering'] = 'crispEdges';
          break;
      }

      for (var i=0; i<sides; i++) {
        points.push([
          pixelate_(r * Math.cos(a * i)),
          pixelate_(r * Math.sin(a * i)),
        ].join());
      }

      attrs_.transform += ' rotate(' + (sides == 4 ? 45 : -90) + ')';
      attrs_.points = points.join(' ');

      element.attr(attrs_);
    },
  };
}]);
