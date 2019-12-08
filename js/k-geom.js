kApp.geom = {
	initialSize: [],
	size: [],

	pt: function(x, y) {
		this.x = x;
		this.y = y;
	},	
	rect: function(xMin, xMax, yMin, yMax) {
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;
	},	
	csize: function(cWidth, cHeight, rect) {
		this.cWidth = cWidth;
		this.cHeight = cHeight;
		this.rect = rect;
	},
	ptR2C: function(x, y) {
		var ret = [];
		ret.x = Math.round((x - kApp.geom.size.rect.xMin)/(kApp.geom.size.rect.xMax-kApp.geom.size.rect.xMin)*kApp.geom.size.cWidth);
		ret.y = Math.round((y - kApp.geom.size.rect.yMin)/(kApp.geom.size.rect.yMax-kApp.geom.size.rect.yMin)*kApp.geom.size.cHeight);
		return ret;
	},
	dimR2C: function(dim) {
		var ret = Math.round(dim/(kApp.geom.size.rect.xMax-kApp.geom.size.rect.xMin)*kApp.geom.size.cWidth);
		return ret;
	}
};