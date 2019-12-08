kApp.bg = {
	count: 0,
	initialized: 0,
	stars: [],
	init: function(size) {
		kApp.bg.starsArr(1000, size);
		this.initialized = true;
	},
	star: function(size) {
		this.pt = kApp.random.ptInRect(size.rect);
		this.intensity = Math.random();
	},
	starsArr: function(count, size) {
		for (var i=0; i<count; i++) {
			kApp.bg.stars[kApp.bg.stars.length] = new kApp.bg.star(size);
		}
		kApp.bg.count = kApp.bg.stars.length;
	}
};
