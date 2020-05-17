kApp.game = {
	players: [
	    {
	    	name: "Human",
	    	type: "HUMAN",
	        color: "blue",
	        credits: 0
	    },
	    {
	    	name: "Computer",
	    	type: "COMPUTER",
	        color: "red",
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
	        bc: 1
	    },
	    {
	    	name: "Destroyer",
	    	type: "DD",
	        credits: 4,
	        av: 3,
	        dv: 2,
	        bc: 2
	    },
	    {
	    	name: "Cruiser",
	    	type: "CA",
	        credits: 8,
	        av: 6,
	        dv: 4,
	        bc: 3
	    },
	    {
	    	name: "Attack Cruiser",
	    	type: "AC",
	        credits: 5,
	        av: 5,      
	        dv: 2,
	        bc: 3
	    },
	    {
	    	name: "Dreadnought",
	    	type: "DN",
	        credits: 15,
	        av: 10,
	        dv: 8,
	        bc: 4
	    },
	    {
	    	name: "Defenses",
	    	type: "SA",
	        credits: -1,
	        av: 1,
	        dv: 1,
	        bc: 1
	    }
    ],
	systems: [
	    {
		    "name": "Terra",
			rPt: new kApp.geom.rPt(-370, 0),
			radius: 5,
			color: "blue",
			ships: [2, 1, 2, 0, 1, 16, 9]
		},
	    {
		    "name": "Omega",
			rPt: new kApp.geom.rPt(-182.5, 110),
			radius: 5,
			color: "blue",
			ships: [4, 0, 1, 0, 1, 14, 7]
		},
		{
		    "name": "Beta",
		    rPt: new kApp.geom.rPt(-182.5, -110),
			radius: 5,
			color: "blue",
			ships: [3, 2, 2, 0, 1, 12, 6]
		},
		{
		    "name": "Ares",
		    rPt: new kApp.geom.rPt(130, 177.5),
			radius: 5,
			color: "red",
			ships: [3, 1, 1, 1, 0, 8, 5]
		},
		{
		    "name": "Pacifica",
		    rPt: new kApp.geom.rPt(385, 252.5),
			radius: 5,
			color: "red",
			ships: [1, 0, 2, 1, 0, 6, 4]
		},
		{
		    "name": "Concordia",
		    rPt: new kApp.geom.rPt(285, -5),
			radius: 5,
			color: "red",
			ships: [2, 1, 1, 0, 1, 10, 6]
		},
		{
		    "name": "Itlantia",
		    rPt: new kApp.geom.rPt(290, -115),
			radius: 5,
			color: "red",
			ships: [1, 0, 1, 0, 0, 8, 5]
		},
		{
		    "name": "Herme",
		    rPt: new kApp.geom.rPt(30, -190),
			radius: 5,
			color: "red",
			ships: [2, 1, 1, 0, 0, 8, 5]
		}
	],
	
	init: function() {
		var time = "0,0,0,0";
		_.each(kApp.game.systems, function(system) {
			system.destination = false;
			system.selected = false;
			system.building = [time, time, time, time, time, time, time];
		});
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
		});
	},

	clearDestinationSystems: function() {
		_.each(kApp.game.systems, function(system) {
			system.destination = false;
		});
	},
	
	setDestinationSystem: function(system) {
		kApp.game.clearDestinationSystems();			
		system.destination = true;
		kApp.render.settings.moves.init();
	}

};
