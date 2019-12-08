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
		
		var xMin = kApp.geom.size.rect.xMin;
		xMin = Math.floor(xMin / major - 1) * major;		
		var xMax = kApp.geom.size.rect.xMax;
		xMax = Math.ceil(xMax / major + 1) * major;
		
		var yMin = kApp.geom.size.rect.yMin;
		yMin = Math.floor(yMin / major - 1) * major;
		var yMax = kApp.geom.size.rect.yMax;
		yMax = Math.ceil(yMax / major + 1) * major;

		// minor gridlines
		stroke(50, 50, 150);
		for (var x=xMin; x<=xMax; x+= minor) {
			var pt1 = kApp.geom.ptR2C(x, yMin);
			var pt2 = kApp.geom.ptR2C(x, yMax);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.size.cWidth,pt2.x), Math.min(kApp.geom.size.cHeight,pt2.y));
		}
		
		for (var y=yMin; y<=yMax; y+= minor) {
			var pt1 = kApp.geom.ptR2C(xMin, y);
			var pt2 = kApp.geom.ptR2C(xMax, y);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.size.cWidth,pt2.x), Math.min(kApp.geom.size.cHeight,pt2.y));
		}
		
		// major gridlines
		stroke(80, 80, 200);

		for (var x=xMin; x<=xMax; x+= major) {
			var pt1 = kApp.geom.ptR2C(x, yMin);
			var pt2 = kApp.geom.ptR2C(x, yMax);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.size.cWidth,pt2.x), Math.min(kApp.geom.size.cHeight,pt2.y));
		}
				
		for (var y=yMin; y<=yMax; y+= major) {
			var pt1 = kApp.geom.ptR2C(xMin, y);
			var pt2 = kApp.geom.ptR2C(xMax, y);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.size.cWidth,pt2.x), Math.min(kApp.geom.size.cHeight,pt2.y));
		}
		
		// major ellipses
		noFill();
		var pt1 = kApp.geom.ptR2C(0, 0);
		for (var x=xMin; x<0; x+= major) {
			var pt2 = kApp.geom.ptR2C(-x, 0);
			var pt3 = kApp.geom.ptR2C(x, 0);
			var w = Math.abs(pt2.x-pt3.x);
			var h = Math.abs(pt2.x-pt3.x);
			ellipse(pt1.x, pt1.y, w, h);
		}
		
		// ordinal gridlines
		stroke(220, 220, 220);

		{
			var pt1 = kApp.geom.ptR2C(0, yMin);
			var pt2 = kApp.geom.ptR2C(0, yMax);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.size.cWidth,pt2.x), Math.min(kApp.geom.size.cHeight,pt2.y));
		}
		
		for (var y=yMin; y<=yMax; y+= major) {
			var pt1 = kApp.geom.ptR2C(xMin, 0);
			var pt2 = kApp.geom.ptR2C(xMax, 0);
			line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.size.cWidth,pt2.x), Math.min(kApp.geom.size.cHeight,pt2.y));
		}
	},
	ship: function(s) {
		var st = Math.round(s.intensity*255);
		//console.log(st);
		stroke(st);
		var pt = kApp.geom.ptR2C(s.pt.x, s.pt.y);
		circle(pt.x, pt.y, s.radius);
	},
	ships: function() {
		//console.log(kApp.sprites.ships.length);
		for (var i=0;i<kApp.sprites.ships.length;i++) {
			var s = kApp.sprites.ships[i];
			kApp.render.ship(s);
		}	
	},
	star: function(s) {
		var st = Math.round(s.intensity*255);
		//console.log(st);
		stroke(st);
		var pt = kApp.geom.ptR2C(s.pt.x, s.pt.y);
		point(pt.x, pt.y);
	},
	stars: function() {
		for (var i=0;i<kApp.bg.stars.length;i++) {
			var s = kApp.bg.stars[i];
			kApp.render.star(s);
		}
	}
};