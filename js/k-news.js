kApp.news = {
	items: [],
	displayMs: 15 * 1000,
	maxDisplay: 16,

	init: function() {
	},
	
	add: function(team, text) {
		var that = this;
		var ms = kApp.date.getMs();
		var item = {
			ms: ms,
			team: team,
			text: text,
			active: 1.0
		}
		that.items.unshift(item);
		kApp.news.checkItemCount();
		//kApp.log(that.items);
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
	
	checkItemCount: function() {
		var activeCount = 0;
		_.each(kApp.news.items, function(item) {
			if (item.active) {
				activeCount++;
			}
			if (activeCount > kApp.news.maxDisplay) {
				item.active = 0;
			}
		});
	},
	
	addTurn: function() {
		var t = Math.floor(kApp.game.settings.turn);
		kApp.news.add("", "Game: Turn " + t + " started");
	},
	
	endTurn: function() {
		var t = Math.floor(kApp.game.settings.turn);
		kApp.news.add("", "Game: Turn " + t + " ended");
	},
	
	addFleetCreated: function(fleet) {
		var displaySpeed = fleet.mv.toFixed(2);
		kApp.news.add(fleet.rcolor, "Created fleet of " + fleet.totalShips + " ships, headed from " + fleet.selectedSystem.name + " to " + fleet.destinationSystem.name + ", at speed " + displaySpeed);
	},
	
	addBuild: function(system, ship, shipCount) {
		kApp.news.add(system.rcolor, "Began construction of " + shipCount + " " + ship.name + (shipCount > 1 ? "s" : "") + " at " + system.name + ", taking " + ship.bc + " turns.");
	},

	addCredits: function(system, player) {
		kApp.news.add(player.rcolor, "System " + system.name + " generated " + system.credits + " to " + player.name + ".");
	},
	
	addFleetArrives: function(fleet) {
		kApp.news.add(fleet.rcolor, "Fleet of " + fleet.totalShips + " ships, from " + fleet.selectedSystem.name + ", arrived at " + fleet.destinationSystem.name + ".");
	},
	addSystemGrowth: function(system, cdelta, cnew) {
		var player = kApp.game.getPlayer(system.team);
		var rcolor = player.rcolor;
		kApp.news.add(rcolor, "System " + system.name + ", has increased defense by " + cdelta + ", to " + cnew + ".");
	},
	addDefenseShipsDest: function(system, defenseShipsDest) {
		var lostShips = kApp.game.shipsToDescription(defenseShipsDest);
		
		var player = kApp.game.getPlayer(system.team);
		var rcolor = player.rcolor;
		kApp.news.add(rcolor, "Ships were lost defending " + system.name + ": " + lostShips + ".");
	},
	addAttackerShipsDest: function(system, team, attackShipsDest) {
		var lostShips = kApp.game.shipsToDescription(attackShipsDest);
		
		var player = kApp.game.getPlayer(team);
		var rcolor = player.rcolor;
		kApp.news.add(rcolor, "Ships of team, " + team  + ", were lost defending " + system.name + ": " + lostShips + ".");
	}
};