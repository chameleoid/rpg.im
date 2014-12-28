app.filter('pixelate', function() {
  return function(input, scale) {
    scale = scale || 32;
    return Math.round(input * scale) / scale;
  };
});
