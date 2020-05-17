kApp.geom = {

	rDistance: 5,
		
	// map data
	map: {
		crect: [],
		rrect: []
	},	

	// pt constructors
	cPt: function(x, y) {
		this.x = x;
		this.y = y;

		this.toString = function() {
			return this.x + "," + this.y;
		}
	},
	rPt: function(x, y) {
		this.x = x;
		this.y = y;
		
		this.toString = function() {
			return this.x + "," + this.y;
		}
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
	
	cPt2rPt: function(cx, cy) {
		var rrect = kApp.geom.map.rrect;
		var crect = kApp.geom.map.crect;
		var ret = new kApp.geom.rPt(
			Math.round((cx - crect.xcenter)/crect.width*rrect.width) + rrect.xcenter,
			-Math.round((cy - crect.ycenter)/crect.height*rrect.height) + rrect.ycenter
		);
		return ret;
	},
	
	rPt2Cpt: function(rx, ry) {
		var rrect = kApp.geom.map.rrect;
		var crect = kApp.geom.map.crect;
		var ret = new kApp.geom.cPt(
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
	},
	
	rdist: function(rPt1, rPt2) {
		var xSq = Math.pow(rPt1.x - rPt2.x, 2);
		var ySq = Math.pow(rPt1.y - rPt2.y, 2);
		return Math.sqrt(xSq + ySq);
	},
	
	ptInCircle: function(rPt, ePt, eRadius) {
		var rDist = kApp.geom.rdist(rPt, ePt);
		ret = (rDist <= eRadius);
		return ret;
	}
};