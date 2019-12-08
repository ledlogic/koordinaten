kApp.sprites = {
	initialized: 0,
	ships: [],
	init: function() {
		kApp.sprites.shipsArr(10);
		this.initialized = true;
	},
	ship: function(radius) {
		this.pt = kApp.random.rptInRrect();
		this.intensity = Math.random();
		this.radius = radius;
		this.theta = Math.random() * Math.PI * 2.0;
		this.absv = ((Math.random() * 0.5) + 0.5);
		this.v = {x:this.absv * Math.cos(this.theta), y:this.absv * Math.sin(this.theta)};
		
		//if (typeof window.test2 === "undefined") {
		//	kApp.log(["this.absv",this.absv]);
		//	kApp.log(["this.theta",this.theta]);
		//	kApp.log(["this.v",this.v]);
		//	window.test2 = 1;
		//}
		this.a = {x:0.0, y:0.0};
		this.thetav = 0.0;
		this.thetaa = 0.0;
		this.coord = [10, 0, -7.07, 7.07, -7.07, -7.07];
		this.radius = (0.5 * Math.random() + 0.5) * radius;
		
	},
	shipsArr: function(count) {
		for (var i=0; i<count; i++) {
			var radius = 10;
			kApp.sprites.ships[kApp.sprites.ships.length] = new kApp.sprites.ship(radius);
		}
	},
	update: function() {
		for (var i=0;i<kApp.sprites.ships.length;i++) {
			var s = kApp.sprites.ships[i];
			kApp.sprites.shipUpdate(s);
		}
	},
	shipUpdate: function(s) {
		s.pt.x += s.v.x;
		s.pt.y += s.v.y;
	}
};
