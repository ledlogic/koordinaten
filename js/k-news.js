kApp.news = {
	items: [],
	displayMs: 30 * 1000,

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
			item.active = Math.max(0, active);
		}
	},
	
	addFleetCreated: function(fleet) {
		var displaySpeed = fleet.mv.toFixed(2);
		kApp.news.add(fleet.rcolor, "Created fleet of " + fleet.totalShips + " ships, headed from " + fleet.selectedSystem.name + " to " + fleet.destinationSystem.name + ", at speed " + displaySpeed);
	}
};