kApp.bg = {
	count: 0,
	initialized: 0,
	stars: [],
	init: function(size) {
		kApp.bg.starsArr(1000);
		this.initialized = true;
	},

	// star constructor
	star: function() {
		this.rpt = kApp.random.rptInRrect();
		this.intensity = Math.random();
	},
	starsArr: function(count) {
		for (var i=0; i<count; i++) {
			kApp.bg.stars[kApp.bg.stars.length] = new kApp.bg.star();
		}
		kApp.bg.count = kApp.bg.stars.length;
	}
};
