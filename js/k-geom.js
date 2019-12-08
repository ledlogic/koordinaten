kApp.geom = {

	// map data
	map: {
		crect: [],
		rrect: []
	},	

	// pt constructors
	cpt: function(x, y) {
		this.x = x;
		this.y = y;
	},
	rpt: function(x, y) {
		this.x = x;
		this.y = y;
	},

	// rect constructors
	crect: function(xMin, yMin, xMax, yMax) {
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;
		this.width = this.xMax - this.xMin;
		this.height  = this.yMax - this.yMin;
		this.xcenter = 0.5 * (this.xMax + this.xMin);
		this.ycenter = 0.5 * (this.yMax + this.yMin);
	},	
	rrect: function(xMin, yMin, xMax, yMax) {
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;
		this.width = this.xMax - this.xMin;
		this.height  = this.yMax - this.yMin;
		this.xcenter = 0.5 * (this.xMax + this.xMin);
		this.ycenter = 0.5 * (this.yMax + this.yMin);
	},
	
	rpt2Cpt: function(rx, ry) {
		var rrect = kApp.geom.map.rrect;
		var crect = kApp.geom.map.crect;
		var ret = new kApp.geom.cpt(
			Math.round((rx - rrect.xcenter)/rrect.width*crect.width) + crect.xcenter,
			-Math.round((ry - rrect.ycenter)/rrect.height*crect.height) + crect.ycenter
		);		
		return ret;
	},
	
	dimR2C: function(dim) {
		var rrect = kApp.geom.map.rrect;
		var crect = kApp.geom.map.crect;
		var ret = Math.round(dim/rrect.width*crect.width);
		return ret;
	}
};