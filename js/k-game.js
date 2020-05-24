kApp.game = {
	settings: {
		turn: 1,
		defaultTurnRatePerMs: 0.000025,
		turnRatePerMs: 0.000025,
		maxTurnRatePerMs: 0.0008,     // about 1 turn/second
		minTurnRatePerMs: 0.00000625,   // about 100 deltas/second
		lastCheckMs: 0,
		spacetime: 100,
		started: false
	},
	players: [
	    {
	    	name: "AI",
	    	type: "AI",
	        color: "blue",
	        rcolor: "rgb(100, 110, 200)",
	        credits: 0
	    },
	    {
	    	name: "Human",
	    	type: "HUMAN",
	        color: "red",
	        rcolor: "rgb(200, 110, 100)",
	        credits: 0 
	    }
	],
	ships: [
	    {
	    	name: "Scout",
	    	type: "SC",
	        credits: 2,
	        av: 1,
	        dv: 1,
	        bc: 1,
	        mv: 2
	    },
	    {
	    	name: "Destroyer",
	    	type: "DD",
	        credits: 4,
	        av: 3,
	        dv: 2,
	        bc: 2,
	        mv: 1.5
	    },
	    {
	    	name: "Cruiser",
	    	type: "CA",
	        credits: 8,
	        av: 6,
	        dv: 4,
	        bc: 3,
	        mv: 1
	    },
	    {
	    	name: "Attack Cruiser",
	    	type: "AC",
	        credits: 5,
	        av: 5,      
	        dv: 2,
	        bc: 3,
	        mv: 1.2
	    },
	    {
	    	name: "Dreadnought",
	    	type: "DN",
	        credits: 15,
	        av: 10,
	        dv: 8,
	        bc: 4,
	        mv: 1
	    },
	    {
	    	name: "Defenses",
	    	type: "SA",
	        credits: -1,
	        av: 1,
	        dv: 1,
	        bc: 1,
	        mv: 0
	    }
    ],
	systems: [
	    {
		    "name": "Terra",
			rPt: new kApp.geom.rPt(-370, 0),
			radius: 5,
			color: "blue",
			ships: [2, 1, 2, 0, 1, 16],
			credits: 9
		},
	    {
		    "name": "Omega",
			rPt: new kApp.geom.rPt(-182.5, 110),
			radius: 5,
			color: "blue",
			ships: [4, 0, 1, 0, 1, 14],
			credits: 7
		},
		{
		    "name": "Beta",
		    rPt: new kApp.geom.rPt(-182.5, -110),
			radius: 5,
			color: "blue",
			ships: [3, 2, 2, 0, 1, 12],
			credits: 6
		},
		{
		    "name": "Ares",
		    rPt: new kApp.geom.rPt(130, 177.5),
			radius: 5,
			color: "red",
			ships: [3, 1, 1, 1, 0, 8],
			credits: 5
		},
		{
		    "name": "Pacifica",
		    rPt: new kApp.geom.rPt(385, 252.5),
			radius: 5,
			color: "red",
			ships: [1, 0, 2, 1, 0, 6],
			credits: 4
		},
		{
		    "name": "Concordia",
		    rPt: new kApp.geom.rPt(285, -5),
			radius: 5,
			color: "red",
			ships: [2, 1, 1, 0, 1, 10],
			credits: 6
		},
		{
		    "name": "Itlantia",
		    rPt: new kApp.geom.rPt(290, -115),
			radius: 5,
			color: "red",
			ships: [1, 0, 1, 0, 0, 8],
			credits: 5
		},
		{
		    "name": "Herme",
		    rPt: new kApp.geom.rPt(30, -190),
			radius: 5,
			color: "red",
			ships: [2, 1, 1, 0, 0, 8],
			credits: 5
		}
	],
	fleets: [],	
	
	init: function() {
		var time = "0,0,0,0";
		_.each(kApp.game.systems, function(system) {
			system.destination = false;
			system.selected = false;
			system.destinationCount = 0;
			system.building = [time, time, time, time, time, time, time];
			system.enemyShips = [0, 0, 0, 0, 0, 0];
		});
		kApp.game.resetCurrentFleet();
	},
	
	start: function() {
		kApp.game.settings.started = true;
		var newMs = kApp.date.getMs();
		kApp.game.settings.lastCheckMs = newMs;
		kApp.data.showGame();

		kApp.news.add("", "Game: started");
		kApp.game.newTurn();
	},
	
	resetCurrentFleet: function() {
		kApp.game.currentFleet = {
			color: null,
			system: null,
			destination: null,
			ships: [],
			rPt: null,
			radius: 5,
			theta: Math.random() * Math.PI * 2.0,
			absv: ((Math.random() * 0.5) + 0.5),
			//v: {x:this.absv * Math.cos(this.theta), y:this.absv * Math.sin(this.theta)},
		 	v: {x:0.0, y:0.0},
			a: {x:0.0, y:0.0},
			thetav: 0.0,
			thetaa: 0.0,
			coord: [10, 0, -7.07, 7.07, -7.07, -7.07],
		};
		_.each(kApp.game.ships, function(ship, i) {
			kApp.game.currentFleet.ships[i] = 0;
		});
		kApp.log(kApp.game.currentFleet.ships);
	},

	ptInSystem: function(rPt) {
		var ret = _.find(kApp.game.systems, function(system) {
			return kApp.geom.ptInCircle(rPt, system.rPt, system.radius + kApp.geom.rDistance);
		});
		return ret;
	},
	
	getPlayer: function(color) {
		var ret = _.find(kApp.game.players, function(player) {
			return player.color == color;
		});
		return ret;
	},
	
	getSelectedSystem: function() {
		var ret = _.find(kApp.game.systems, function(system) {
			return system.selected;
		});
		return ret;
	},
	
	getDestinationSystem: function() {
		var ret = _.find(kApp.game.systems, function(system) {
			return system.destination;
		});
		return ret;
	},
	
	clearSelectedSystems: function() {
		_.each(kApp.game.systems, function(system) {
			system.selected = false;
			system.destinationCount = 0;
		});
	},

	clearDestinationSystems: function() {
		_.each(kApp.game.systems, function(system) {
			system.destination = false;
		});
	},
	
	setDestinationSystem: function(system) {
		kApp.game.clearDestinationSystems();
		
		var selectedSystem = kApp.game.getSelectedSystem();
		selectedSystem.destinationCount++;
		kApp.log(selectedSystem.destinationCount);
		
		system.destination = true;
		kApp.render.settings.moves.init();
	},
	
	selectedSystemHasDestinationCount: function() {
		var selectedSystem = kApp.game.getSelectedSystem();
		if (selectedSystem != null) {
			return selectedSystem.destinationCount;
		} else {
			return 0;
		}
	},
	
	clearSelectedSystemDestinationCount: function() {
		var selectedSystem = kApp.game.getSelectedSystem();
		if (selectedSystem != null) {
			selectedSystem.destinationCount = 0;
		}
	},

	update: function() {
		// if game not yet started, pause
		if (!kApp.game.settings.started) {
			return;
		}
		
		var turn = kApp.game.settings.turn;
		var newMs = kApp.date.getMs();
		var lastCheckMs = kApp.game.settings.lastCheckMs;
		var turnRatePerMs = kApp.game.settings.turnRatePerMs;
		
		if (newMs > lastCheckMs) {
			// update turn data
			kApp.game.settings.turn += (newMs - lastCheckMs) * turnRatePerMs;
			kApp.game.settings.lastCheckMs = newMs;
			kApp.data.updateGame();
			
			// update news
			kApp.news.update(newMs);
			
			// update turn-based sprites
			var newFleets = [];
			var arrivedFleets = [];
			_.each(kApp.game.fleets, function(fleet) {
				var lastTurn = fleet.startTurn;
				var turn = kApp.game.settings.turn;
				var elapsed = turn - lastTurn;
				var dist = fleet.mv * elapsed * kApp.game.settings.spacetime;
				var ratio = dist/fleet.rdist; 
				ratio = Math.min(ratio, 1.0);
				ratio = Math.max(ratio, 0.0);
				fleet.ratio = ratio;
				var rPt = kApp.geom.rPtBetween(fleet.startPt, fleet.endPt, ratio);
				fleet.rPt = rPt;		
				kApp.log("ratio[" + ratio + "], dist[" + dist + "], startPt[" + fleet.startPt + "], endPt[" + fleet.endPt + "], rPt[" + rPt + "]");
				if (ratio == 1.0) {
					arrivedFleets.push(fleet);
				} else {
					newFleets.push(fleet);
				}
			});			
			if (arrivedFleets.length) {
				kApp.game.fleets = newFleets;
			}
				
			// check for new game turn
			if (Math.floor(kApp.game.settings.turn) - Math.floor(turn) >= 1) {
				kApp.game.newTurn();
			}
		}
	},
	
	newTurn: function() {
		kApp.log("newTurn");
		kApp.news.addTurn();
		
		// increment credits
		kApp.log("newTurn: increment credits");
		_.each(kApp.game.players, function(player) {
			var color = player.color;
			_.each(kApp.game.systems, function(system) {
				if (system.color == color) {
					player.credits += system.credits;
					kApp.news.addCredits(system, player);
				}
			});
		});
		kApp.data.showPlayers();

		// build track
		kApp.log("newTurn: build track");
		_.each(kApp.game.systems, function(system) {
			for (var i=0; i<kApp.game.ships.length - 1;i++) {
				var building = system.building[i];
				var buildingArr = building.split(",");
				var shipIncr = parseInt(buildingArr[0], 10);
				system.ships[i] = system.ships[i] + shipIncr;
				for (var j=0; j<buildingArr.length - 1; j++) {
					buildingArr[j] = buildingArr[j+1];
				}
				buildingArr[length-1] = 0;
				system.building[i] = buildingArr.join(",");
			}
			if (system.selected) {
				kApp.data.showSystem(system);
			}
		});
		
		// artificial intelligence
		kApp.log("newTurn: ai");
		kApp.ai.build();
		kApp.ai.attack();		
	}
};
