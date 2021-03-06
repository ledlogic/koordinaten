kApp.render = {
	settings: {
		grid: {
			major: false,
			minor: false,
			ellipses: false,
			ordinals: false
		},
		moves: {
			delta: 0.04,
			velocity: 4,
			init: function() {
				kApp.render.settings.moves.start = 0;
				kApp.render.settings.moves.end = kApp.render.settings.moves.delta;				
			},
			incr: function(dist) {
				kApp.render.settings.moves.start += kApp.render.settings.moves.velocity / dist;
				kApp.render.settings.moves.end = Math.min(kApp.render.settings.moves.end + kApp.render.settings.moves.velocity / dist, 1.0);
				if (kApp.render.settings.moves.start >= 1 - 0.05) {
					kApp.render.settings.moves.init();
				}
			}
		},
		system: {
			coord: false
		},
		phenomena: {
			blackhole: {
				type: "blackhole",
				name: "NGC " + kApp.random.intBetween(4000, 10000),
				radius: kApp.random.intBetween(15, 30),
				rPt: new kApp.geom.rPt(0, 0),
				starcount: 450,
				starrange: 500,
				stars: []
			}		
		}
	},
	
	init: function() {
		kApp.render.settings.moves.init();
		kApp.render.initPhenomena();
		kApp.render.settings.phenomena.blackhole.starrange = 1000;
	},
	
	blackholestar: function() {
		var star = this;
		kApp.render.resetStar(star);
	},
	
	resetStar: function(star) {
		var x = Math.random();
		var radius = (kApp.render.settings.phenomena.blackhole.starrange - kApp.render.settings.phenomena.blackhole.radius) * Math.pow(x / (1 + x), 2)
		           + kApp.render.settings.phenomena.blackhole.radius;
		star.radius = radius;
		var theta = kApp.random.theta();
		star.theta = theta;
		var rPt = kApp.geom.rTheta2rPt(radius, theta);
		star.rPt = rPt; 
		star.intensity = kApp.random.blackholestarIntensity();
		
		kApp.render.updateblackholestar(star);
	},
	
	updateblackholestar: function(star) {
		// recompute new theta
		var theta = Math.atan2(star.rPt.y, star.rPt.x);
		star.theta = theta;
		//kApp.log("theta:" + theta);

		var vtheta = theta + 0.5 * Math.PI * 1.1;
		star.vtheta = vtheta;
		//kApp.log("vtheta:" + vtheta);

		var v = Math.pow(1/star.radius,2) * 100;
		star.v = v;
		//kApp.log("v:" + v);

		var vPt = kApp.geom.rTheta2rPt(star.v, star.vtheta);
		star.vPt = vPt;
		//kApp.log("star.rPt:(" + star.rPt.x + ", " + star.rPt.y + "), star.vPt: (" + star.vPt.x + ", " + star.vPt.y + ")");
		
		kApp.geom.rPtAdd(star.rPt, star.vPt);
		
		var radius = kApp.geom.radius(star.rPt);
		star.radius = radius;
		if (star.radius < kApp.render.settings.phenomena.blackhole.radius) {
			kApp.render.resetStar(star);
		}
	},
	
	initPhenomena: function() {
		var starcount = kApp.render.settings.phenomena.blackhole.starcount;
		var stars = kApp.render.settings.phenomena.blackhole.stars;
		for (var i=0; i<starcount; i++) {
			stars.push(new kApp.render.blackholestar());
		}
	},
	
	fps: function() {
		var fps = frameRate();
		fill(255);
		stroke(0);
		textSize(14);
		textStyle(NORMAL);
		textFont('Microgramma Extd D');
		
		var y = kApp.geom.map.crect.height - 10;
		text("FPS: " + fps.toFixed(0), 10, y);
	},
	
	bg: function() {
		background(30,30,30);
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
			stroke(25, 25, 75);
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
			stroke(40, 40, 100);
	
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
			stroke(110, 110, 110);
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
	
	fleet: function(s) {
		var pt = kApp.geom.rPt2Cpt(s.rPt.x, s.rPt.y);
		
		// shields
		//noFill();
		//stroke("green");
		//var cRadius = kApp.geom.dimR2C(s.radius * 1.2);
		//circle(pt.x, pt.y, cRadius);
		
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
			s.rcoord[i] = s.rcoord[i] + s.rPt.x;
			s.rcoord[i+1] = s.rcoord[i+1] + s.rPt.y;
		}

		s.cpt = [];
		for (var i=0; i+1<s.coord.length; i+=2) {
			var pt = kApp.geom.rPt2Cpt(s.rcoord[i], s.rcoord[i+1]);
			s.cpt[i] = pt.x;
			s.cpt[i+1] = pt.y;
		}
		
		stroke(153);
		fill(s.rcolor);
		triangle(s.cpt[0], s.cpt[1], s.cpt[2], s.cpt[3], s.cpt[4], s.cpt[5]);
		
		// distance text
		noStroke();
		textSize(8);
		textStyle(NORMAL);
		textFont("Calibri");
		var t = s.totalShips;
		var tPt = kApp.geom.rPt2Cpt(s.rPt);
		text(t, tPt.x-2, tPt.y+15);
	},
	fleets: function() {
		for (var i=0;i<kApp.game.fleets.length;i++) {
			var fleet = kApp.game.fleets[i];
			kApp.render.fleet(fleet);
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
	
	teamFill: function(t) {
		// interior
		if (t === "blue") {
			fill(100, 110, 200);
		} else {
			fill(200, 110, 100);
		}
	},
	
	systemFill: function(s) {
		kApp.render.teamFill(s.team);
	},
	
	systemStroke: function(s) {
		// interior
		if (s.team === "blue") {
			stroke(100, 110, 200);
		} else {
			stroke(200, 110, 100);
		}
	},
	
	moves: function() {
		var selected = kApp.game.getSelectedSystem();
		var destination = kApp.game.getDestinationSystem();
		if (selected && destination) {
			// line
			stroke(100);
			var pt1 = kApp.geom.rPt2Cpt(selected.rPt);
			var pt2 = kApp.geom.rPt2Cpt(destination.rPt);
			line(pt1.x, pt1.y, pt2.x, pt2.y);
			
			// animation
			stroke(200);
			var rPt1 = kApp.geom.rPtBetween(selected.rPt, destination.rPt, kApp.render.settings.moves.start);
			var rPt2 = kApp.geom.rPtBetween(selected.rPt, destination.rPt, kApp.render.settings.moves.end);
			var pt1 = kApp.geom.rPt2Cpt(rPt1);
			var pt2 = kApp.geom.rPt2Cpt(rPt2);
			line(pt1.x, pt1.y, pt2.x, pt2.y);
			
			// distance text
			noStroke();
			fill(200);
			textSize(14);
			textFont("Calibri");
			textStyle(NORMAL);
			var dist = kApp.geom.rdist(selected.rPt, destination.rPt);
			var symbol = (selected.team == destination.team) ? kApp.symbols.defense : kApp.symbols.attack;
			var t = symbol + " " + Math.round(dist) + " ps";
			var midPt = kApp.geom.rPtBetween(selected.rPt, destination.rPt, 0.5);
			var tPt = kApp.geom.rPt2Cpt(midPt);
			text(t, tPt.x+15, tPt.y+4);
			
			// incr for next time
			kApp.render.settings.moves.incr(dist);
		}
	},
	
	system: function(s) {
		var cpt = kApp.geom.rPt2Cpt(s.rPt.x, s.rPt.y);
		
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

		// system
		kApp.render.systemFill(s);
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
		textSize(14);
		textStyle(NORMAL);
		textFont("Calibri");
		var t = s.name;
		if (kApp.render.settings.system.coord) {
			t += " (" + s.rPt + ")"
		}
		text(t, cpt.x+15, cpt.y+4);

		// three parts
		var textMargin = 4;
		var tPt = kApp.geom.rPt2Cpt(s.rPt);
		var yship = tPt.y-15;
		
		// calc team ships
		kApp.render.systemFill(s);
		noStroke();
		textSize(10);
		textStyle(NORMAL);
		textFont("Calibri");
		var ships = kApp.game.shipsInSystem(s);
		var teamShips = ships[s.team];
		var teamShipsWidth = textWidth(teamShips);

		// calc team defense
		var teamDefense = s.ships[s.ships.length - 1];
		var teamDefenseWidth = textWidth(teamDefense);

		// render team ships
		text(teamShips, tPt.x-teamShipsWidth-textMargin-Math.round(teamDefenseWidth/2), yship);
		
		// render team defense
		text(teamDefense, tPt.x-Math.round(teamDefenseWidth/2), yship);
		
		// render other ships
		_.map(ships, function(value, key) {
			if (key != s.team) {
				kApp.render.teamFill(key);
				text(value, tPt.x+Math.round(teamDefenseWidth/2)+textMargin, yship);
			}
		});
	},
	
	systems: function() {
		for (var i=0; i<kApp.game.systems.length; i++) {
			var s = kApp.game.systems[i ];
			kApp.render.system(s);
		}
	},
	
	phenomena: function() {
		_.each(kApp.render.settings.phenomena, function(phenomena) {
			switch (phenomena.type) {
				case "blackhole":
					
					// black hole
					var cpt = kApp.geom.rPt2Cpt(phenomena.rPt.x, phenomena.rPt.y);
					fill(30,30,30);
					noStroke();
					var cRadius = kApp.geom.dimR2C(phenomena.radius * 1.0);
					circle(cpt.x, cpt.y, cRadius);

					// nearby stars
					var stars = kApp.render.settings.phenomena.blackhole.stars;
					_.each(stars, function(star) {
						//kApp.geom.rPtAdd(star.rPt, star.vPt);				
						//kApp.geom.rPtAdd(star.rPt, new kApp.geom.rPt(-1,0));
						kApp.render.updateblackholestar(star);
						fill(star.intensity);
						var cPt = kApp.geom.rPt2Cpt(star.rPt.x, star.rPt.y);
						circle(cPt.x, cPt.y, 1);
					});
					break;
			}
		});
	},
	
	news: function() {
		var x0 = 10;
		var y0 = 20;
		var yDelta = 20;
		for (var i=0; i<kApp.news.items.length; i++) {
			var item = kApp.news.items[i];
			if (item.active > 0.1) {
				textSize(14);
				textFont("Calibri");
				textStyle(ITALIC);
				var itemColor = color(item.team ? item.team : "(100,220,100)");
				itemColor.setAlpha(Math.round(255 * item.active));
				fill(itemColor);
				var t = item.text;
				text(t, x0, (i * yDelta) + y0);
			}
		}
	}
};
