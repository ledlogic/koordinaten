kApp.data = {
	init: function() {
		
	},
	
	showSystem: function(s) {
		
		var h = [];
		h.push("<table id=\"k-system-data-table\">");
		h.push("<th>Owner</th><td class=\"k-system-owner\">" + s.color + "</td>");
		h.push("</table>");
		$("#k-system-data").html(h.join(""));
		$("#k-system").fadeIn();
		
		var h = [];
		
		h.push("<table id=\"k-ships-data-table\">");
		h.push("<tr>");
		h.push("<th>");
		h.push("type");
		h.push("</th>");
		h.push("<th>");
		h.push("current");
		h.push("</th>");
		h.push("<th>");
		h.push("cost");
		h.push("</th>");
		h.push("<th>");
		h.push("building");
		h.push("</th>");
		
		h.push("</tr>");
		for (var i=0; i<kApp.game.ships.length;i++) {
			var name = kApp.game.ships[i].name;
			var ships = s.ships[i]
			var cost = kApp.game.ships[i].credits > 0 ? "¤ " + kApp.game.ships[i].credits : "NA";

			h.push("<tr>");
			h.push("<td class=\"k-ships-name\">");
			h.push(name);
			h.push("</td>");
			
			h.push("<td class=\"k-ships-current\">");
			h.push(ships);
			h.push("</td>");
			
			h.push("<td class=\"k-ships-credits\">");
			h.push(cost);
			h.push("</td>");
			
			h.push("<td class=\"k-ships-building\">");
			h.push(s.building[i]);
			h.push("</td>");
			
			h.push("</tr>");
		}
		h.push("</table>");
		$("#k-ships-data").html(h.join(""));
		$("#k-ships").fadeIn();
	},
	hideSystem: function(s) {
		$("#k-system").fadeOut();
		$("#k-ships").fadeOut();
	}
};