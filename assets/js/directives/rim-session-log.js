app.directive('rimSessionLog',
  ['$document', '$window', 'rimDraggableDirective',
    function($document, $window, rimDraggableDirective) {
      return {
        controller: 'SessionLogController',
        link: function($scope, $element) {
          // More hacks.  There isn't a good way to inherit linking from other
          // directives, so we're doing it here with this.  Could be better,
          // but it works.
          rimDraggableDirective[0].link.apply(this, arguments);
        },
      };
    }
  ]
);
