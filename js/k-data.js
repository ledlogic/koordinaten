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
		h.push("</td>");
		h.push("</tr>");
		
		h.push("</table>");
		
		$("#k-game-data").html(h.join(""));
		$("#k-game").fadeIn();
		
		kApp.data.updateGame();
		
		var $buttons = $(".k-game-turn-rate-decr, .k-game-turn-rate-incr");
		$buttons.on("click", kApp.events.changeTurnRate);
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
		h.push("Credits");
		h.push("</th>");
		h.push("</tr>");
		
		for (var i=0; i<kApp.game.players.length;i++) {
			var name = kApp.game.players[i].name;
			var color = kApp.game.players[i].color;
			var credits = kApp.game.players[i].credits;
			var creditDisplay = "¤ " + credits;

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
		h.push("<th>Strength</th><td class=\"k-system-defense\">" + defense + "</td>");
		h.push("</tr>");
		h.push("<tr>");
		h.push("<th>Income</th><td class=\"k-system-credits\">" + credits + "</td>");
		h.push("</tr>");
		h.push("</table>");
		$("#k-system-data").html(h.join(""));
		$("#k-system").fadeIn();
		
		var h = [];
		
		h.push("<table id=\"k-ships-data-table\">");
		
		h.push("<tr>");
		h.push("<th>");
		h.push("Qty");
		h.push("</th>");
		h.push("<th>");
		h.push("Type");
		h.push("</th>");
		h.push("<th>");
		h.push("Att");
		h.push("</th>");
		h.push("<th>");
		h.push("Def");
		h.push("</th>");
		h.push("<th>");
		h.push("Cost");
		h.push("</th>");
		h.push("<th>");
		h.push("Building");
		h.push("</th>");
		h.push("</tr>");
		
		for (var i=0; i<kApp.game.ships.length - 1;i++) {
			var name = kApp.game.ships[i].name;
			var ships = s.ships[i];
			var ship = kApp.game.ships[i];
			var creditDisplay = ship.credits > 0 ? "¤ " + ship.credits : "NA";
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
			if (buildable) {
				h.push("<button class=\"k-data-button k-ships-incr\" data-ship-i=\"" + i + "\">+</button>");
			}
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
			
			h.push("<td class=\"k-ships-credits\">");
			h.push(creditDisplay);
			h.push("</td>");
			
			h.push("<td class=\"k-ships-building\">");
			h.push(building);
			h.push("</td>");
			
			h.push("</tr>");
		}
		h.push("</table>");
		$("#k-ships-data").html(h.join(""));
		$("#k-ships").fadeIn();
		
		$(".k-ships-incr").on("click", kApp.events.build);
	},
	hideSystem: function(s) {
		$("#k-system").fadeOut();
		$("#k-ships").fadeOut();
	}
};