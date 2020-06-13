kApp.events = {
	init: function() {
		
	},
	
	// user clicked the i-th ship build button for the current selected system
	build: function(e) {
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
		var credits = ship.credits;
		if (credits == null) {
			return;
		}
		var player = kApp.game.getPlayer("red");
		if (player == null) {
			return;
		}
		
		var shipCount = 0;
		var creditCount = 0;

		// check modifier keys
		var altKey = e.altKey;		
		var shiftKey = e.shiftKey;
		
		if (shiftKey) {
			shipCount = Math.floor(player.credits / credits);
		} else if (altKey) {
			shipCount = 5;
		} else {
			shipCount = 1;
		}
		
		shipCount = Math.min(Math.floor(player.credits / credits), shipCount);
		creditCount = credits * shipCount;
		
		if (shipCount) {
			player.credits -= creditCount;
			
			var building = system.building[i];
			var buildingArr = building.split(",");
			buildingArr[bc-1] = parseInt(buildingArr[bc-1], 10) + shipCount;
			system.building[i] = buildingArr.join(",");
			
			kApp.news.addBuild(system, ship, shipCount);
			
			kApp.data.showPlayers();
			kApp.data.showSystem(system);
		}
	},
	
	// user has changed move amount + / -
	move: function(e) {
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
		
		// check modifier keys
		var altKey = e.altKey;		
		var shiftKey = e.shiftKey;
		
		if (shiftKey && change > 0) {
			currentFleet.ships[i] = selectedSystem.ships[i];
		} else if (shiftKey && change < 0) {
			currentFleet.ships[i] = 0;
		} else if (altKey) {
			currentFleet.ships[i] += 5 * change;
		} else {
			currentFleet.ships[i] += change;
		}
		
		// check boundaries
		currentFleet.ships[i] = Math.max(currentFleet.ships[i], 0);
		currentFleet.ships[i] = Math.min(currentFleet.ships[i], selectedSystem.ships[i]);
		
		$(".k-data-move-ship-" + i).html(currentFleet.ships[i]);
	},
	
	// user is in the movement state.
	// user has said to move the current fleet
	moveFleet: function() {
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
		// last minute correction for ships lost in action
		// prevent sneak resurrection through move screen, negative ship counts
		var totalShips = 0;
		for (var i=0; i<kApp.game.ships.length - 1;i++) {
			var qty = Math.min(currentFleet.ships[i], selectedSystem.ships[i]);
			selectedSystem.ships[i] -= qty;
			currentFleet.ships[i] = qty;
			totalShips += qty;
		}
		
		if (totalShips) {
			// build up current fleet stats		
			var fleet = kApp.game.currentFleet;
			fleet.color = selectedSystem.color;
			fleet.rcolor = kApp.game.getPlayer(fleet.color).rcolor;
			fleet.selectedSystem = selectedSystem;
			fleet.destinationSystem = destinationSystem;
			fleet.startPt = selectedSystem.rPt;
			fleet.endPt = destinationSystem.rPt;
			fleet.rPt = fleet.startPt;
			fleet.mv = kApp.sprites.averageMv(currentFleet.ships)
			fleet.startTurn = kApp.game.settings.turn;
			fleet.rdist =  kApp.geom.rdist(fleet.startPt, fleet.endPt);
			fleet.theta = kApp.geom.radians(fleet.startPt, fleet.endPt);
			fleet.totalShips = totalShips;
			kApp.game.fleets.push(fleet);
			kApp.news.addFleetCreated(fleet);
		}
		
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
			//kApp.log("clearingSystems");
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
				var radius = kApp.render.settings.phenomena.blackhole.radius;
				var r = radius * 3;
				var rPt0 = kApp.render.settings.phenomena.blackhole.rPt;
				var rPt1 = selectedSystem.rPt;
				var rPt2 = system.rPt;
				var intersections = kApp.geom.findrPtCircleLineIntersections(r, rPt0, rPt1, rPt2);
				var isSafe = intersections.length == 0; 
				//kApp.log("intersections[" + intersections + "]");
				//kApp.log("isSafe[" + isSafe + "]");
				if (isSafe) {
					kApp.game.setDestinationSystem(system);
					kApp.data.showMove();
				}
			}
		}
	},
	
	moveStarted: function() {
		kApp.log("moveStarted");
	},
	
	changeTurnRate: function() {
		var $that = $(this);
		var change = parseFloat($that.data("rate-change"), 10);
		var newRate = kApp.game.settings.turnRatePerMs * change;
		newRate = Math.max(newRate, kApp.game.settings.minTurnRatePerMs);
		newRate = Math.min(newRate, kApp.game.settings.maxTurnRatePerMs);
		kApp.game.settings.turnRatePerMs = newRate;
		kApp.data.updateGame();
	},
	
	resetTurnRate: function() {
		kApp.game.settings.turnRatePerMs = kApp.game.settings.defaultTurnRatePerMs; 
		kApp.data.updateGame();
	},
	
	startGame: function() {
		kApp.game.start();
	}
}
