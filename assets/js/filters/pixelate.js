app.filter('pixelate', function() {
	return function(input, scale) {
		scale = scale || 32;
		return Math.floor(input * scale) / scale;
	};
});
