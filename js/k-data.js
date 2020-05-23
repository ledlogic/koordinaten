kApp.data = {
	init: function() {
		this.showGame();
		this.showPlayers();
	},
	
	showGame: function() {
		var h = [];
		h.push("<table id=\"k-game-data-table\">");

		h.push("<tr>");
		h.push("<th>");
		h.push("Turn");
		h.push("</th>");
		h.push("<td class=\"k-game-turn\">");
		h.push("<span id=\"k-game-turn-value\">");
		h.push("</span>");
		if (!kApp.game.settings.started) {
			h.push("<button class=\"k-data-button k-game-start\" >Start</button>");
		}
		h.push("</td>");
		h.push("</tr>");
		
		h.push("<tr>");
		h.push("<th>");
		h.push("Rate");
		h.push("</th>");
		h.push("<td class=\"k-game-turn-rate\">");
		h.push("<button class=\"k-data-button k-game-turn-rate-decr\" data-rate-change=\"0.5\">-</button>");
		h.push("<span id=\"k-game-turn-rate-value\">");
		h.push("</span>");
		h.push("<button class=\"k-data-button k-game-turn-rate-incr\" data-rate-change=\"2.0\">+</button>");
		h.push(" ");
		h.push("<button class=\"k-data-button k-game-turn-rate-reset\">Reset</button>");
		h.push("</tr>");
		
		h.push("</table>");
		
		$("#k-game-data").html(h.join(""));
		$("#k-game").fadeIn();
		
		kApp.data.updateGame();
		
		var $start = $(".k-game-start");
		$start.on("click", kApp.events.startGame);
		
		var $buttons = $(".k-game-turn-rate-decr, .k-game-turn-rate-incr");
		$buttons.on("click", kApp.events.changeTurnRate);
		
		var $reset = $(".k-game-turn-rate-reset");
		$reset.on("click", kApp.events.resetTurnRate);
	},
	
	updateGame: function() {
		var turn = (Math.round(kApp.game.settings.turn * 100) / 100).toFixed(2);
		var rate = Math.round(1.0/kApp.game.settings.turnRatePerMs);
		$("#k-game-turn-value").html(turn);
		$("#k-game-turn-rate-value").html("1/"+rate);
	},
		
	showPlayers: function() {
		var h = [];
		h.push("<table id=\"k-player-data-table\">");

		h.push("<tr>");
		h.push("<th>");
		h.push("Player");
		h.push("</th>");
		h.push("<th>");
		h.push("Credits (¤)");
		h.push("</th>");
		h.push("</tr>");
		
		for (var i=0; i<kApp.game.players.length;i++) {
			var name = kApp.game.players[i].name;
			var color = kApp.game.players[i].color;
			var credits = kApp.game.players[i].credits;
			var creditDisplay = credits;

			h.push("<tr>");
			h.push("<td class=\"k-player-name k-color-" + color + "\">");
			h.push(name);
			h.push("</td>");
			
			h.push("<td class=\"k-ships-credits k-color-" + color + "\">");
			h.push(creditDisplay);
			h.push("</td>");
			h.push("</tr>");
		}
		h.push("</table>");
		
		$("#k-player-data").html(h.join(""));
		$("#k-player").fadeIn();
	},
	
	showSystem: function(s) {
		if (s == null) {
			s = kApp.game.getSelectedSystem();
		}
		
		var player = kApp.game.getPlayer(s.color);
		var defense = s.ships[5];
		var credits = s.credits;
		var color = s.color;
		var human = player.type == "HUMAN";
		
		var h = [];
		h.push("<table id=\"k-system-data-table\">");
		h.push("<tr>");
		h.push("<th>Owner</th><td class=\"k-system-owner k-color-" + color + "\">" + player.name + "</td>");
		h.push("</tr>");
		h.push("<tr>");
		h.push("<th>Defense (⛨)</th><td class=\"k-system-defense\">" + defense + "</td>");
		h.push("</tr>");
		h.push("<tr>");
		h.push("<th>Income (¤/Turn)</th><td class=\"k-system-credits\">" + credits + "</td>");
		h.push("</tr>");
		h.push("</table>");
		$("#k-system-data").html(h.join(""));
		$("#k-system").fadeIn();
		$("#k-system-data").on("selectstart", function() {return false;});
		
		var h = [];
		
		h.push("<table id=\"k-ships-data-table\">");
		
		h.push("<tr>");
		h.push("<th>");
		h.push("#");
		h.push("</th>");
		h.push("<th>");
		h.push("Type");
		h.push("</th>");
		h.push("<th>");
		h.push("⚔");
		h.push("</th>");
		h.push("<th>");
		h.push("⛨");
		h.push("</th>");
		h.push("<th>");
		h.push("✈");
		h.push("</th>");
		h.push("<th>");
		h.push("¤");
		h.push("</th>");
		h.push("<th>");
		h.push("🛠");
		h.push("</th>");
		h.push("</tr>");
		
		for (var i=0; i<kApp.game.ships.length - 1;i++) {
			var name = kApp.game.ships[i].name;
			var ships = s.ships[i];
			var ship = kApp.game.ships[i];
			var creditDisplay = ship.credits > 0 ? ship.credits : "NA";
			var buildingArr = s.building[i].split(",");
			var buildingArr2 = [];
			_.each(buildingArr, function(b, i) {
				if (i < ship.bc) {
					buildingArr2[i] = (i+1) + ": " + b;
				}
			});
			var building = buildingArr2.join(" <span class=\"k-ship-building-delimiter\">/</span> ");
			var hasCredits = player.credits >= ship.credits;
			var buildable = human && hasCredits;

			h.push("<tr>");
			h.push("<td class=\"k-ships-current\">");
			h.push(ships);
			h.push("</td>");

			h.push("<td class=\"k-ships-name\">");
			h.push(name);
			h.push("</td>");
			
			h.push("<td class=\"k-ships-attack\">");
			h.push(ship.av);
			h.push("</td>");

			h.push("<td class=\"k-ships-defense\">");
			h.push(ship.dv);
			h.push("</td>");
			
			h.push("<td class=\"k-ships-move\">");
			h.push(ship.mv);
			h.push("</td>");
			
			h.push("<td class=\"k-ships-credits\">");
			h.push(creditDisplay);
			h.push("</td>");
			
			h.push("<td class=\"k-ships-building\">");
			if (buildable) {
				h.push("<button class=\"k-data-button k-ships-incr\" data-ship-i=\"" + i + "\">+</button>");
			}
			h.push(building);
			h.push("</td>");
			
			h.push("</tr>");
		}
		h.push("</table>");
		$("#k-ships-data").html(h.join(""));
		$("#k-ships").fadeIn();
		$("#k-ships-data").on("selectstart", function() {return false;});
		$(".k-ships-incr").on("click", kApp.events.build);
	},
	hideSystem: function(s) {
		$("#k-system").fadeOut();
		$("#k-ships").fadeOut();
		$("#k-move").fadeOut();
	},
	showMove: function() {
		var selectedSystem = kApp.game.getSelectedSystem();
		if (selectedSystem == null) {
			return;
		}
		var	destinationSystem = kApp.game.getDestinationSystem();
		if (destinationSystem == null) {
			return;
		}
		if (!kApp.game.settings.started) {
			return;
		}
		
		var h = [];
		h.push("<table id=\"k-move-data-table\">");
		h.push("<tr>");
		h.push("<th>From</th><td class=\"k-move-from k-color-" + selectedSystem.color + "\">" + selectedSystem.name+ "</td>");
		h.push("</tr>");
		h.push("<tr>");
		h.push("<th>To</th><td class=\"k-move-to k-color-" + destinationSystem.color + "\">" + destinationSystem.name + "</td>");
		h.push("</tr>");
		h.push("</table>");
		
		h.push("<table id=\"k-move-data-table\">");
		
		h.push("<tr>");
		h.push("<th>");
		h.push("Moving");
		h.push("</th>");
		h.push("<th>");
		h.push("Type");
		h.push("</th>");
		h.push("<th>");
		h.push("⚔");
		h.push("</th>");
		h.push("<th>");
		h.push("Def");
		h.push("</th>");
		h.push("</tr>");
		
		for (var i=0; i<kApp.game.ships.length - 1;i++) {
			var name = kApp.game.ships[i].name;
			var ships = selectedSystem.ships[i];
			var ship = kApp.game.ships[i];
			var moveable = ships > 0;
			kApp.game.currentFleet.ships[i] = 0;

			if (moveable) {
				h.push("<tr>");
		
				h.push("<td class=\"k-ships-moving\">");
				var moving = kApp.game.currentFleet.ships[i];
				h.push("<button class=\"k-data-button k-ships-move-decr\" data-ship-i=\"" + i + "\" data-move-change=\"-1\">-</button>");
				h.push("<span class=\"k-data-move-ship-" + i + "\" data-ship-i=\"" + i + "\">" + moving + "</span>");
				h.push("<button class=\"k-data-button k-ships-move-incr\" data-ship-i=\"" + i + "\" data-move-change=\"1\">+</button>");
				h.push("</td>");
		
				h.push("<td class=\"k-ships-name\">");
				h.push(name);
				h.push("</td>");
				
				h.push("<td class=\"k-ships-attack\">");
				h.push(ship.av);
				h.push("</td>");
		
				h.push("<td class=\"k-ships-defense\">");
				h.push(ship.dv);
				h.push("</td>");
				
				h.push("</tr>");
			}
		}
		h.push("</table>");
		
		h.push("<button class=\"k-data-button k-ships-move-action\">Send fleet</button>");
		
		$("#k-move-data").html(h.join(""));
		$("#k-move").fadeIn();
		
		$("#k-move-data").on("selectstart", function() {return false;});
		$(".k-ships-move-decr, .k-ships-move-incr").on("click", kApp.events.move);
		$(".k-ships-move-action").on("click", kApp.events.moveFleet);
	},
	hideMove: function() {
		$("#k-move").fadeOut();
	}
};