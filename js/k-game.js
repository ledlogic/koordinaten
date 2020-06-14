kApp.game = {
	settings: {
		turn: 1,
		defaultTurnRatePerMs: 0.000025,
		turnRatePerMs: 0.000025,
		maxTurnRatePerMs: 0.0008,     // about 1 turn/second
		minTurnRatePerMs: 0.00000625,   // about 100 deltas/second
		lastCheckMs: 0,
		spacetime: 100,
		started: false,
		paused: false
	},
	players: [
	    {
	    	name: "AI",
	    	type: "AI",
	        team: "blue",
	        credits: 0,
	        rcolor: "rgb(100, 110, 200)"
	    },
	    {
	    	name: "Human",
	    	type: "HUMAN",
	    	team: "red",
	        credits: 0,
	        rcolor: "rgb(200, 110, 100)"
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
			team: "blue",
			ships: [2, 1, 2, 0, 1, 16],
			credits: 9
		},
	    {
		    "name": "Omega",
			rPt: new kApp.geom.rPt(-182.5, 110),
			radius: 5,
			team: "blue",
			ships: [4, 0, 1, 0, 1, 14],
			credits: 7
		},
		{
		    "name": "Beta",
		    rPt: new kApp.geom.rPt(-182.5, -110),
			radius: 5,
			team: "blue",
			ships: [3, 2, 2, 0, 1, 12],
			credits: 6
		},
		{
		    "name": "Ares",
		    rPt: new kApp.geom.rPt(130, 177.5),
			radius: 5,
			team: "red",
			ships: [3, 1, 1, 1, 0, 8],
			credits: 5
		},
		{
		    "name": "Pacifica",
		    rPt: new kApp.geom.rPt(385, 252.5),
			radius: 5,
			team: "red",
			ships: [1, 0, 2, 1, 0, 6],
			credits: 4
		},
		{
		    "name": "Concordia",
		    rPt: new kApp.geom.rPt(285, -5),
			radius: 5,
			team: "red",
			ships: [2, 1, 1, 0, 1, 10],
			credits: 6
		},
		{
		    "name": "Itlantia",
		    rPt: new kApp.geom.rPt(290, -115),
			radius: 5,
			team: "red",
			ships: [1, 0, 1, 0, 0, 8],
			credits: 5
		},
		{
		    "name": "Herme",
		    rPt: new kApp.geom.rPt(30, -190),
			radius: 5,
			team: "red",
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
			system.otherShips = kApp.game.buildotherTeamShips(system);
			system.logisticGrowthModel = kApp.game.initialSystemLogisticGrowthModel(system);
		});
		kApp.game.resetCurrentFleet();
	},
	
	buildotherTeamShips: function(system) {
		var ret = {}; 
		_.each(kApp.game.players, function(player) {
			if (system.team != player.team) {
				ret[player.team] = [0, 0, 0, 0, 0, 0];
			}
		});
		return ret;
	},
	
	start: function() {
		kApp.game.settings.started = true;
		kApp.game.settings.paused = false;
		var newMs = kApp.date.getMs();
		kApp.game.settings.lastCheckMs = newMs;
		kApp.data.showGame();

		kApp.news.add("", "Game: started");
		kApp.game.newTurn();
	},
	
	resetCurrentFleet: function() {
		kApp.game.currentFleet = {
			team: null,
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
	
	getPlayer: function(team) {
		var ret = _.find(kApp.game.players, function(player) {
			return player.team == team;
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
	
	shipsInSystem: function(s) {
		var ret = {};
		
		// system ships
		var count = kApp.game.shipCount(s.ships, 1);
		ret[s.team] = count;

		// team ships
		_.map(s.otherShips, function (ships, team) {
			var count = kApp.game.shipCount(ships, 0);
			ret[team] = count;
		});		
		
		return ret;
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
		if (kApp.game.settings.paused) {
			return;
		}
		
		var turn = kApp.game.settings.turn;
		var newMs = kApp.date.getMs();
		var lastCheckMs = kApp.game.settings.lastCheckMs;
		var turnRatePerMs = kApp.game.settings.turnRatePerMs;
		
		if (newMs > lastCheckMs) {
			// update turn data
			kApp.game.settings.turn += (newMs - lastCheckMs) * turnRatePerMs;
			
			// prevent from skipping too far past turn boundary!
			var turnFloor = Math.floor(turn);
			kApp.game.settings.turn = Math.min(turnFloor + 1, kApp.game.settings.turn);
			
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
				//kApp.log("ratio[" + ratio + "], dist[" + dist + "], startPt[" + fleet.startPt + "], endPt[" + fleet.endPt + "], rPt[" + rPt + "]");
				if (ratio == 1.0) {
					arrivedFleets.push(fleet);
				} else {
					newFleets.push(fleet);
				}
			});			
			if (arrivedFleets.length) {
				kApp.game.fleets = newFleets;
			}
			
			// merge arrive fleets
			kApp.game.mergeFleets(arrivedFleets);
				
			// check for new game turn
			if (Math.floor(kApp.game.settings.turn) - turnFloor >= 1) {
				kApp.game.endTurn();
				//kApp.game.newTurn();
			}
		}
	},
	
	mergeFleets: function(arrivedFleets) {
		_.each(arrivedFleets, function(fleet) {
			var fleetTeam = fleet.team;
			var destinationSystem = fleet.destinationSystem;
			var destinationTeam = destinationSystem.team;
			var ships = fleet.ships;
			var isFriendly = (fleetTeam == destinationTeam)
			//kApp.log("fleet.ships[" + fleet.ships + "]");
			if (isFriendly) {
				//kApp.log("destinationSystem.ships[" + destinationSystem.ships + "]");
				for (var i=0;i<fleet.ships.length;i++) {
					destinationSystem.ships[i] += fleet.ships[i];
				}
				//kApp.log("destinationSystem.ships[" + destinationSystem.ships + "]");
			} else {
				//kApp.log("destinationSystem.otherShips[fleetTeam][" + destinationSystem.otherShips[fleetTeam] + "]");
				for (var i=0;i<fleet.ships.length;i++) {
					destinationSystem.otherShips[fleetTeam][i] += fleet.ships[i];
				}
				//kApp.log("destinationSystem.otherShips[fleetTeam][" + destinationSystem.otherShips[fleetTeam] + "]");
			}			
			kApp.news.addFleetArrives(fleet);		
		});		
	},
	
	endTurn: function() {
		kApp.log("endTurn");
		kApp.news.endTurn();
		
		// stop time
		kApp.game.settings.paused = true;
		
		// resolve battles at systems
		kApp.game.resolveBattles();
		
		// update population
		kApp.game.logisticGrowthCalc();
		
		// start new turn / restart time
		setTimeout("kApp.game.start()", 5000);
	},
	
	resolveBattles: function() {
		kApp.log("resolveBattles");

		_.each(kApp.game.systems, function(system) {
			var dv = 0;
			for (var i=0;i<system.ships.length - 1;i++) {
				var q = system.ships[i];
				var d = kApp.game.ships[i].dv;
				dv += q * d;
			}
			var av = 0;
			_.map(system.otherShips, function(otherShips, team) {
				for (var i=0;i<otherShips.length;i++) {
					var q = otherShips[i];
					var a = kApp.game.ships[i].av;
					av += q * a;
				}
			});
			
			kApp.log("system.name[" + system.name + "]");			
			kApp.log("dv[" + dv + "], av[" + av + "]");			
			
			// attacking ships
			if (av > 0) {
				var defenseShipsDest = [];
				for (var i=0;i<system.ships.length - 1;i++) {
					var q = system.ships[i];
					var d = kApp.game.ships[i].dv;
					defenseShipsDest[i] = Math.min(Math.floor(av / d), q);
					av -= defenseShipsDest[i] * d;
					if (defenseShipsDest[i] > 0) {
						system.ships[i] -= defenseShipsDest[i];
					}
				}
				var count = kApp.game.shipCount(defenseShipsDest, 0);
				kApp.log("defenseShipsDest[" + defenseShipsDest + "], count[" + count + "]");
				if (count) {
					kApp.news.addDefenseShipsDest(system, defenseShipsDest);
				}
			}
			
			// defending ships
			if (dv > 0) {
				_.map(system.otherShips, function(otherShips, team) {
					var attackShipsDest = [];
					for (var i=0;i<otherShips.length - 1;i++) {
						var q = otherShips[i];
						var d = kApp.game.ships[i].dv;
						attackShipsDest[i] = Math.min(Math.floor(dv / d), q);
						dv -= attackShipsDest[i] * d;
						if (attackShipsDest[i] > 0) {
							otherShips[i] -= attackShipsDest[i];
						}
					}
					var count = kApp.game.shipCount(attackShipsDest, 0);
					kApp.log("attackShipsDest[" + attackShipsDest + "], count[" + count + "]");
					if (count) {
						kApp.news.addAttackerShipsDest(system, team, attackShipsDest);
					}	
				});
			}			
			
			// conquer mode
			if (dv == 0) {
				
			}
		});
	},
	
	newTurn: function() {
		kApp.log("newTurn");
		kApp.news.addTurn();
		
		// increment credits
		kApp.log("newTurn: increment credits");
		_.each(kApp.game.players, function(player) {
			var team = player.team;
			_.each(kApp.game.systems, function(system) {
				if (system.team == team) {
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
	},

	// @see https://codesandbox.io/s/function-plot-jxudi?file=/src/index.js
	initialSystemLogisticGrowthModel: function(system) {
		kApp.log("system.name[" + system.name + "]");
		var c0 = system.ships[system.ships.length-1];
		kApp.log("c0[" + c0 + "]");
		var c = c0 + Math.random() * 10.0 + 5.0;
		kApp.log("c[" + c + "]");
		var b = Math.random() * 0.3 + 0.2;
		kApp.log("b[" + b + "]");
		//var a = Math.exp(b + 10.0);
		var a = c / c0 - 1.0;
		kApp.log("a[" + a + "]");
		system.lgm = {
			c0: c0,
			a: a,
			b: b,
			c: c
		};
	},
	
	systemLogisticGrowthCalc: function(system) {
		var cstart = system.ships[system.ships.length-1];
		
		var c0 = system.lgm.c0
		var x = (kApp.game.settings.turn - 1.0);
		var y = system.lgm.c / ( 1 + system.lgm.a * Math.exp(-system.lgm.b * x));
		var cdelta = Math.floor(y-cstart);
		var cnew = cstart + cdelta;
		kApp.log("c0[" + c0 + "], cstart[" + cstart + "], cdelta[" + cdelta + "], cnew[" + cnew + "], x[" + x + "], y[" + y + "]");
		
		if (cdelta) {
			system.ships[system.ships.length-1] = cnew;
			kApp.news.addSystemGrowth(system, cdelta, cnew);
		}
	},
	
	logisticGrowthCalc: function() {
		_.each(kApp.game.systems, function(system) {
			kApp.game.systemLogisticGrowthCalc(system);
		});
	},
	
	// if count exists for ship type, adds to a human-readable string
	shipsToDescription: function(ships) {
		var ret = [];
		for (var i=0; i<ships.length;i++) {
			var q = ships[i];
			if (q) {
				ret.push(q + " " + kApp.game.ships[i].name);
			}
		}
		if (ret.length) {
			ret[ret.length-1] = " and " + ret[ret.length-1]; 
		}
		// oxford comma list
		return ret.join(", ");
	},
	
	shipCount: function(ships, delta) {
		// way to preclude defense rating for systems
		if (!delta) {
			delta = 0;
		}
		
		// system ships
		var count = 0;
		for (var i=0; i<ships.length-delta;i++) {
			count += ships[i];
		}		
		return count;
	}	

};
