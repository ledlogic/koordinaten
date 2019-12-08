var kApp = {
	size: [],
	init: function() {
		kApp.sizeCanvas();
  	    var w = Math.floor($("#k-canvas").width());
		var h = Math.floor($("#k-canvas").height());
		console.log([w,h]);
		var rect = new kApp.geom.rect(-w/2, w/2, -h/2, h/2);
		var size = new kApp.geom.size(w, h, rect);
		console.log(size);
		kApp.initialSize = size;
		kApp.size = kApp.initialSize;
		kApp.bg.init(kApp.initialSize);

		var c = createCanvas(kApp.size.cWidth, kApp.size.cHeight);
		c.parent('k-canvas');
	},
	ptR2C: function(x, y) {
		var ret = [];
		ret.x = Math.round((x - kApp.size.rect.xMin)/(kApp.size.rect.xMax-kApp.size.rect.xMin)*kApp.size.cWidth);
		ret.y = Math.round((y - kApp.size.rect.yMin)/(kApp.size.rect.yMax-kApp.size.rect.yMin)*kApp.size.cHeight);
		return ret;
	},
	log: function(s) {
		console.log(s);
	},
	sizeCanvas: function() {
		// @see http://jsfiddle.net/b5DGj/7/
		var wh = document.body.clientHeight;
		var $h = $("header");
		var hms = parseInt($h.css("marginTop"),10);
		var hh = $h.height();
		var $f = $("footer");
		var fms = parseInt($f.css("marginTop"),10);
		var fh = $f.height();
		var h = wh - hh - hms * 2 - fh - fms * 2;
		console.log([wh,hms,hh,fh,h]);		
		var $el = $('#k-canvas');
		$el.height(h);
	}
};

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

kApp.render = {
	fps: function() {
		var fps = frameRate();
		fill(255);
		stroke(0);
		textSize(14);
		textFont('Microgramma Extd D');
		text("FPS: " + fps.toFixed(0), 10, height - 10);
	},
	grid: function() {
		var major = 100;
		var minor = 20;
		
		var xMin = kApp.size.rect.xMin;
		xMin = Math.floor(xMin / major - 1) * major;		
		var xMax = kApp.size.rect.xMax;
		xMax = Math.ceil(xMax / major + 1) * major;
		
		var yMin = kApp.size.rect.yMin;
		yMin = Math.floor(yMin / major - 1) * major;
		var yMax = kApp.size.rect.yMax;
		yMax = Math.ceil(yMax / major + 1) * major;

		// minor gridlines
		stroke(50, 50, 150);
		for (var x=xMin; x<=xMax; x+= minor) {
			var pt1 = kApp.ptR2C(x, yMin);
			var pt2 = kApp.ptR2C(x, yMax);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.size.cWidth,pt2.x), Math.min(kApp.size.cHeight,pt2.y));
		}
		
		for (var y=yMin; y<=yMax; y+= minor) {
			var pt1 = kApp.ptR2C(xMin, y);
			var pt2 = kApp.ptR2C(xMax, y);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.size.cWidth,pt2.x), Math.min(kApp.size.cHeight,pt2.y));
		}
		
		// major gridlines
		stroke(80, 80, 200);

		for (var x=xMin; x<=xMax; x+= major) {
			var pt1 = kApp.ptR2C(x, yMin);
			var pt2 = kApp.ptR2C(x, yMax);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.size.cWidth,pt2.x), Math.min(kApp.size.cHeight,pt2.y));
		}
				
		for (var y=yMin; y<=yMax; y+= major) {
			var pt1 = kApp.ptR2C(xMin, y);
			var pt2 = kApp.ptR2C(xMax, y);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.size.cWidth,pt2.x), Math.min(kApp.size.cHeight,pt2.y));
		}
		
		// major ellipses
		noFill();
		var pt1 = kApp.ptR2C(0, 0);
		for (var x=xMin; x<0; x+= major) {
			var pt2 = kApp.ptR2C(-x, 0);
			var pt3 = kApp.ptR2C(x, 0);
			var w = Math.abs(pt2.x-pt3.x);
			var h = Math.abs(pt2.x-pt3.x);
			ellipse(pt1.x, pt1.y, w, h);
		}
		
		// ordinal gridlines
		stroke(220, 220, 220);

		{
			var pt1 = kApp.ptR2C(0, yMin);
			var pt2 = kApp.ptR2C(0, yMax);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.size.cWidth,pt2.x), Math.min(kApp.size.cHeight,pt2.y));
		}
		
		for (var y=yMin; y<=yMax; y+= major) {
			var pt1 = kApp.ptR2C(xMin, 0);
			var pt2 = kApp.ptR2C(xMax, 0);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.size.cWidth,pt2.x), Math.min(kApp.size.cHeight,pt2.y));
		}
	},
	star: function(s) {
		var st = Math.round(s.intensity*255);
		//console.log(st);
		stroke(st);
		var pt = kApp.ptR2C(s.pt.x, s.pt.y);
		point(pt.x, pt.y);
	},
	stars: function() {
		for (var i=0;i<kApp.bg.stars.length;i++) {
			var s = kApp.bg.stars[i];
			kApp.render.star(s);
		}
	}
};

//$(window).on('scroll resize', getVisible);
function windowResized() {
	//kApp.sizeCanvas();
}
