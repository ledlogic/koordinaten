kApp.news = {
	items: [],
	displayMs: 20 * 1000,

	init: function() {
	},
	
	add: function(color, text) {
		var that = this;
		var ms = kApp.date.getMs();
		var turn = kApp.game.settings.turn;
		var item = {
			ms: ms,
			color: color,
			text: text,
			active: 1.0
		}
		that.items.unshift(item);
		kApp.log(that.items);
	},
	
	update: function(newMs) {
		_.each(kApp.news.items, function(item) {
			kApp.news.checkExpiration(item, newMs);
		});
	},
	
	checkExpiration: function(item, newMs) {
		if (item.active) {
			var displayMs = kApp.news.displayMs;
			var active = (displayMs + item.ms - newMs) / displayMs;
			kApp.log(active);
			item.active = Math.max(0, active);  
		}
	}
};