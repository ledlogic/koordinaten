kApp.random = {
	between: function(min, max) {
		return min + Math.random() * (max - min);
	},
	ptInRect: function(r) {
		var x = kApp.random.between(r.xMin, r.xMax);
		var y = kApp.random.between(r.yMin, r.yMax);
		return new kApp.geom.pt(x, y);
	}
};
 