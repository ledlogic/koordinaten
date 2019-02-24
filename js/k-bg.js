kApp.bg = {
	stars: [],
	init: function(size) {
		kApp.bg.stars = kApp.bg.starsArr(1000, size);
	},
	star: function(size) {
		this.pt = kApp.random.ptInRect(size.rect);
		this.intensity = Math.random();
	},
	starsArr: function(count, size) {
		var ret = [];
		for (var i=0; i<count; i++) {
			ret[i] = new kApp.bg.star(size);
		}
		return ret;
	}
};
