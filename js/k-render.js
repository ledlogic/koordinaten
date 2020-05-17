kApp.render = {
	settings: {
		grid: {
			major: false,
			minor: false,
			ellipses: false,
			ordinals: true
		},
		system: {
			coord: true
		}
	},
	fps: function() {
		var fps = frameRate();
		fill(255);
		stroke(0);
		textSize(14);
		textFont('Microgramma Extd D');
		
		var y = kApp.geom.map.crect.height - 10;
		//console.log([fps.toFixed(0),y]);
		text("FPS: " + fps.toFixed(0), 10, y);
	},
	grid: function() {
		var major = 100;
		var minor = 20;
		
		var xMin = kApp.geom.map.rrect.xMin;
		xMin = Math.floor(xMin / major - 1) * major;		
		var xMax = kApp.geom.map.rrect.xMax;
		xMax = Math.ceil(xMax / major + 1) * major;
		
		var yMin = kApp.geom.map.rrect.yMin;
		yMin = Math.floor(yMin / major - 1) * major;
		var yMax = kApp.geom.map.rrect.yMax;
		yMax = Math.ceil(yMax / major + 1) * major;

		// minor gridlines
		if (kApp.render.settings.grid.minor) {
			stroke(50, 50, 150);
			for (var x=xMin; x<=xMax; x+= minor) {
				var pt1 = kApp.geom.rPt2Cpt(x, yMin);
				var pt2 = kApp.geom.rPt2Cpt(x, yMax);
				line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.map.crect.width,pt2.x), Math.min(kApp.geom.map.crect.height,pt2.y));
			}
			
			for (var y=yMin; y<=yMax; y+= minor) {
				var pt1 = kApp.geom.rPt2Cpt(xMin, y);
				var pt2 = kApp.geom.rPt2Cpt(xMax, y);
				line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.map.crect.width,pt2.x), Math.min(kApp.geom.map.crect.height,pt2.y));
			}
		}
		
		// major gridlines
		if (kApp.render.settings.grid.major) {
			stroke(80, 80, 200);
	
			for (var x=xMin; x<=xMax; x+= major) {
				var pt1 = kApp.geom.rPt2Cpt(x, yMin);
				var pt2 = kApp.geom.rPt2Cpt(x, yMax);
				line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.map.crect.width,pt2.x), Math.min(kApp.geom.map.crect.height,pt2.y));
			}
					
			for (var y=yMin; y<=yMax; y+= major) {
				var pt1 = kApp.geom.rPt2Cpt(xMin, y);
				var pt2 = kApp.geom.rPt2Cpt(xMax, y);
				line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.map.crect.width,pt2.x), Math.min(kApp.geom.map.crect.height,pt2.y));
			}
		}
		
		// major ellipses
		if (kApp.render.settings.grid.ellipses) {
			noFill();
			var pt1 = kApp.geom.rPt2Cpt(0, 0);
			for (var x=xMin; x<0; x+= major) {
				var pt2 = kApp.geom.rPt2Cpt(-x, 0);
				var pt3 = kApp.geom.rPt2Cpt(x, 0);
				var w = Math.abs(pt2.x-pt3.x);
				var h = Math.abs(pt2.x-pt3.x);
				ellipse(pt1.x, pt1.y, w, h);
			}
		}
		
		// ordinal gridlines
		if (kApp.render.settings.grid.ordinals) {
			stroke(220, 220, 220);
			{
				var pt1 = kApp.geom.rPt2Cpt(0, yMin);
				var pt2 = kApp.geom.rPt2Cpt(0, yMax);
				line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.map.crect.width,pt2.x), Math.min(kApp.geom.map.crect.height,pt2.y));
			}
			
			for (var y=yMin; y<=yMax; y+= major) {
				var pt1 = kApp.geom.rPt2Cpt(xMin, 0);
				var pt2 = kApp.geom.rPt2Cpt(xMax, 0);
				line(Math.max(0,pt1.x), Math.max(0,pt1.y), Math.min(kApp.geom.map.crect.width,pt2.x), Math.min(kApp.geom.map.crect.height,pt2.y));
			}
		}
	},
	ship: function(s) {
		var st = Math.round(127 + s.intensity*128);
		stroke(st);
		var pt = kApp.geom.rPt2Cpt(s.pt.x, s.pt.y);
		
		noFill();
		stroke("green");
		var cRadius = kApp.geom.dimR2C(s.radius * 1.2);
		circle(pt.x, pt.y, cRadius);
		
		// rotate
		s.rcoord = [];
		var theta = s.theta;
		var sin = Math.sin(theta);
		var cos = Math.cos(theta);
		for (var i=0; i+1<s.coord.length; i+=2) {
			s.rcoord[i] = s.coord[i] * cos - s.coord[i+1] * sin;
			s.rcoord[i+1] = s.coord[i] * sin + s.coord[i+1] * cos;
		}

		// scale
		for (var i=0; i+1<s.coord.length; i+=2) {
			 s.rcoord[i] = s.rcoord[i] * s.radius / 10.0;
			 s.rcoord[i+1] = s.rcoord[i+1] * s.radius / 10.0;
		}
		
		// translate
		for (var i=0; i+1<s.coord.length; i+=2) {
			s.rcoord[i] = s.rcoord[i] + s.pt.x;
			s.rcoord[i+1] = s.rcoord[i+1] + s.pt.y;
		}

		s.cpt = [];
		for (var i=0; i+1<s.coord.length; i+=2) {
			var pt = kApp.geom.rPt2Cpt(s.rcoord[i], s.rcoord[i+1]);
			s.cpt[i] = pt.x;
			s.cpt[i+1] = pt.y;
		}
		
		stroke(153);
		fill("red");
		triangle(s.cpt[0], s.cpt[1], s.cpt[2], s.cpt[3], s.cpt[4], s.cpt[5]);
	},
	ships: function() {
		for (var i=0;i<kApp.sprites.ships.length;i++) {
			var s = kApp.sprites.ships[i];
			kApp.render.ship(s);
		}	
	},
	star: function(s) {
		var st = Math.round(s.intensity*255);
		stroke(st);
		var pt = kApp.geom.rPt2Cpt(s.rPt.x, s.rPt.y);
		point(pt.x, pt.y);
	},
	stars: function() {
		for (var i=0;i<kApp.bg.stars.length;i++) {
			var s = kApp.bg.stars[i];
			kApp.render.star(s);
		}
	},
	
	systemFill: function(s) {
		// interior
		if (s.color === "blue") {
			fill(100, 110, 200);
		} else {
			fill(200, 110, 100);
		}
	},
	
	systemStroke: function(s) {
		// interior
		if (s.color === "blue") {
			stroke(100, 110, 200);
		} else {
			stroke(200, 110, 100);
		}
	},
	
	system: function(s) {
		noFill();
		stroke(255);
		
		var cpt = kApp.geom.rPt2Cpt(s.rPt.x, s.rPt.y);
		
		kApp.render.systemFill(s);
		kApp.render.systemStroke(s);

		// selected
		if (s.selected) {
			stroke(255);
			fill(0);
			var cRadius = kApp.geom.dimR2C(s.radius * 1.0 + 5.0);
			circle(cpt.x, cpt.y, cRadius);

			kApp.render.systemFill(s);
			var cRadius = kApp.geom.dimR2C(s.radius * 1.0);
			circle(cpt.x, cpt.y, cRadius);
		}

		noStroke();
		var cRadius = kApp.geom.dimR2C(s.radius * 1.0);
		circle(cpt.x, cpt.y, cRadius);

		// name
		noStroke();
		if (s.selected) {
			fill(255);
		} else {
			kApp.render.systemFill(s);
		}
		textFont("Calibri");
		var t = s.name;
		if (kApp.render.settings.system.coord) {
			t += " (" + s.rPt + ")"
		}
		text(t, cpt.x+15, cpt.y+4);
	},
	systems: function() {
		for (var i=0; i<kApp.game.systems.length; i++) {
			var s = kApp.game.systems[i];
			kApp.render.system(s);
		}
	},
	test: function() {
		fill(0);

		var rcoord = [100,0, 70.7,70.7, 0,100];
		var cpt = [];
		for (var i=0; i+1<rcoord.length; i+=2) {
			var pt = kApp.geom.rPt2Cpt(rcoord[i], rcoord[i+1]);
			cpt[i] = pt.x;
			cpt[i+1] = pt.y;
		}
		
		stroke(200);
		triangle(cpt[0], cpt[1], cpt[2], cpt[3], cpt[4], cpt[5]);
		
		var rcoord = [0,100, -70.7,70.7, -100,0];
		var cpt = [];
		for (var i=0; i+1<rcoord.length; i+=2) {
			var pt = kApp.geom.rPt2Cpt(rcoord[i], rcoord[i+1]);
			cpt[i] = pt.x;
			cpt[i+1] = pt.y;
		}

		stroke(150);
		triangle(cpt[0], cpt[1], cpt[2], cpt[3], cpt[4], cpt[5]);

		var rcoord = [-100,0, -70.7,-70.7, 0,-100];
		var cpt = [];
		for (var i=0; i+1<rcoord.length; i+=2) {
			var pt = kApp.geom.rPt2Cpt(rcoord[i], rcoord[i+1]);
			cpt[i] = pt.x;
			cpt[i+1] = pt.y;
		}

		stroke(100);
		triangle(cpt[0], cpt[1], cpt[2], cpt[3], cpt[4], cpt[5]);

		var rcoord = [0,-100, 70.7,-70.7, 100,0];
		var cpt = [];
		for (var i=0; i+1<rcoord.length; i+=2) {
			var pt = kApp.geom.rPt2Cpt(rcoord[i], rcoord[i+1]);
			cpt[i] = pt.x;
			cpt[i+1] = pt.y;
		}

		stroke(50);
		triangle(cpt[0], cpt[1], cpt[2], cpt[3], cpt[4], cpt[5]);
	}
};
