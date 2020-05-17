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
		var $that = $(this);
		var i = $that.data("ship-i");
		if (i == null) {
			return;
		}
		var selectedSystem = kApp.game.getSelectedSystem();
		if (selectedSystem == null) {
			return;
		}
		var ship = kApp.game.ships[i];
		if (ship == null) {
			return;
		}
		var currentFleet = kApp.game.currentFleet;
		if (currentFleet == null) {
			return;
		}
		var change = $that.data("move-change");
		if (change == null) {
			return;
		}
		currentFleet.ships[i] += change;
		currentFleet.ships[i] = Math.max(currentFleet.ships[i], 0);
		currentFleet.ships[i] = Math.min(currentFleet.ships[i], selectedSystem.ships[i]);
		
		$(".k-data-move-ship-" + i).html(currentFleet.ships[i]);
	},
	moveFleet: function() {
		debugger;
		var $that = $(this);
		var selectedSystem = kApp.game.getSelectedSystem();
		if (selectedSystem == null) {
			return;
		}
		var destinationSystem = kApp.game.getDestinationSystem();
		if (destinationSystem == null) {
			return;
		}
		var currentFleet = kApp.game.currentFleet;
		if (currentFleet == null) {
			return;
		}
		
		// remove ships from selected system
		for (var i=0; i<kApp.game.ships.length - 1;i++) {
			var qty = currentFleet.ships[i];
			selectedSystem.ships[i] -= qty;
		}
		
		// build up fleet		
		kApp.game.currentFleet.selectedSystem = selectedSystem;
		kApp.game.currentFleet.destinationSystem = destinationSystem;
		kApp.game.currentFleet.rPt = selectedSystem.rPt;
		kApp.game.fleets.push(kApp.game.currentFleet);
		
		// update
		kApp.game.resetCurrentFleet();
		kApp.game.clearDestinationSystems();
		kApp.data.hideMove();
		kApp.data.showSystem();
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
				kApp.data.showMove();
			}
		}
	},
	moveStarted: function() {
		kApp.log("moveStarted");
	},
	changeTurnRate: function() {
		var $that = $(this);
		var change = parseFloat($that.data("rate-change"), 10);
		kApp.game.settings.turnRatePerMs = kApp.game.settings.turnRatePerMs * change; 
		kApp.data.updateGame();
	}
}
