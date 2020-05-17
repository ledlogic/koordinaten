kApp.events = {
	init: function() {
		
	},
	// user clicked the i-th ship build button for the current selected system
	build: function() {
		var $that = $(this);
		var i = $that.data("ship-i");
		if (i == null) {
			return;
		}
		var system = kApp.game.getSelectedSystem();
		if (system == null) {
			return;
		}
		var ship = kApp.game.ships[i];
		if (ship == null) {
			return;
		}
		var bc = ship.bc;
		if (bc == null) {
			return;
		}
		var player = kApp.game.getPlayer("red");
		if (player == null) {
			return;
		}
		
		player.credits -= ship.credits;
		var building = system.building[i];
		var buildingArr = building.split(",");
		buildingArr[bc-1] = parseInt(buildingArr[bc-1], 10) + 1;
		system.building[i] = buildingArr.join(",");
		
		kApp.data.showPlayers();
		kApp.data.showSystem(system);
	},
	move: function() {
		
	},
	info: function() {
		
	},
	selectSystem: function(s) {
		if (!s || !s.selected) {
			kApp.log("clearingSystems");
			kApp.game.clearSelectedSystems();
			if (s) {
				s.selected = true;
				kApp.data.showSystem(s);
			} else {
				kApp.data.hideSystem();
			}
		}
	},
	potentialMove: function() {
		var selectedSystem = kApp.game.getSelectedSystem();
		if (selectedSystem != null) {
			var cPt = new kApp.geom.cPt(mouseX, mouseY);
			var rPt = kApp.geom.cPt2rPt(cPt.x, cPt.y);
			var system = kApp.game.ptInSystem(rPt);
			if (!system) {
				kApp.game.clearDestinationSystems();
			} else if (system != selectedSystem && !system.destination) {
				kApp.game.setDestinationSystem(system);
			}
		}
	},
	moveStarted: function() {
		kApp.log("moveStarted");
	}
}
