angular.forEach(
  ['x', 'y', 'width', 'height', 'strokeWidth', 'fill', 'transform'],
  function(name) {
    var ngName = 'ng' + name[0].toUpperCase() + name.slice(1);

    app.directive(ngName, function() {
      return function(scope, element, attrs) {
        attrs.$observe(ngName, function(value) {
          attrs.$set(name, value);
        });
      };
    });
  }
);
