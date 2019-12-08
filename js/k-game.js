kApp.game = {
	players: [
	    {
	    	name: "Human",
	    	type: "HUMAN",
	        color: "blue"
	    },
	    {
	    	name: "Computer",
	    	type: "COMPUTER",
	        color: "red"
	    }
	],
	systems: [
	    {
		    "name": "Sol",
			rpt: {x:300.0, y:100.0},
			radius: 10,
			color: "blue"
		},
	    {
		    "name": "Romulus",
		    rpt: {x:-300.0, y:-200.0},
			radius: 9,
			color: "red"
		}
	],
	
	init: function() {
		
	}
};