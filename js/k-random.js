kApp.random = {
	between: function(min, max) {
		return min + Math.random() * (max - min);
	},	
	rPtInRrect: function(r) {
		if (!r) {
			r = kApp.geom.map.rrect;
		}
		var x = kApp.random.between(r.xMin, r.xMax);
		var y = kApp.random.between(r.yMin, r.yMax);
		return new kApp.geom.rPt(x, y);
	}
};
 