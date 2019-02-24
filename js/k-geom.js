kApp.geom = {
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
	size: function(cWidth, cHeight, rect) {
		this.cWidth = cWidth;
		this.cHeight = cHeight;
		this.rect = rect;
	}
};