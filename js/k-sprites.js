kApp.sprites = {
	initialized: 0,
	ships: [],
	init: function(size) {
		kApp.sprites.shipsArr(1, size);
		this.initialized = true;
	},
	ship: function(size, radius) {
		this.pt = kApp.random.ptInRect(size.rect);
		this.intensity = Math.random();
		this.radius = radius;
		this.theta = Math.random() * Math.PI * 2.0;
		this.absv = (Math.random() * 10 -5);
		this.v = {x:this.absv * Math.cos(this.theta), y:this.absv * Math.sin(this.theta)};
		kApp.log(this.theta);
		kApp.log(this.v);
		//if (this.theta > Math.PI && this.theta < Math.PI * 1.5) {
		//	this.v.y = -this.v.y;
		//	kApp.log(this.v);
		//}
		this.a = {x:0.0, y:0.0};
		this.thetav = 0.0;
		this.thetaa = 0.0;
		this.coord = [10, 0, -7.07, 7.07, -7.07, -7.07];
		this.radius = (0.5 * Math.random() + 0.5) * radius;
		
	},
	shipsArr: function(count, size) {
		for (var i=0; i<count; i++) {
			var radius = 10;
			kApp.sprites.ships[kApp.sprites.ships.length] = new kApp.sprites.ship(size, radius);
		}
		//console.log(kApp.sprites.ships.length);
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
