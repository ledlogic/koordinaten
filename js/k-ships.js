kApp.sprites = {
	initialized: 0,
	ships: [],
	init: function(size) {
		kApp.sprites.shipsArr(10, size);
		this.initialized = true;
	},
	ship: function(size, radius) {
		this.pt = kApp.random.ptInRect(size.rect);
		this.intensity = Math.random();
		this.radius = radius;
	},
	shipsArr: function(count, size) {
		for (var i=0; i<count; i++) {
			var radius = 10;
			kApp.sprites.ships[kApp.sprites.ships.length] = new kApp.sprites.ship(size, radius);
		}
		//console.log(kApp.sprites.ships.length);
	}
};
