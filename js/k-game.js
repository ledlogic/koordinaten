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
	    }
    ],
	systems: [
	    {
		    "name": "Terra",
			rpt: {x:-370, y:0},
			radius: 5,
			color: "blue",
			ships: [2, 1, 2, 0, 1, 16, 9]
		},
	    {
		    "name": "Omega",
		    rpt: {x:-182.5, y:110},
			radius: 5,
			color: "blue",
			ships: [4, 0, 1, 0, 1, 14, 7]
		},
		{
		    "name": "Beta",
		    rpt: {x:-182.5, y:-110},
			radius: 5,
			color: "blue",
			ships: [3, 2, 2, 0, 1, 12, 6]
		},
		{
		    "name": "Ares",
		    rpt: {x:130, y:177.5},
			radius: 5,
			color: "red",
			ships: [3, 1, 1, 1, 0, 8, 5]
		},
		{
		    "name": "Pacifica",
		    rpt: {x:385, y:252.5},
			radius: 5,
			color: "red",
			ships: [1, 0, 2, 1, 0, 6, 4]
		},
		{
		    "name": "Concordia",
		    rpt: {x:285, y:-5},
			radius: 5,
			color: "red",
			ships: [2, 1, 1, 0, 1, 10, 6]
		},
		{
		    "name": "Itlantia",
		    rpt: {x:290, y:-115},
			radius: 5,
			color: "red",
			ships: [1, 0, 1, 0, 0, 8, 5]
		},
		{
		    "name": "Herme",
		    rpt: {x:30, y:-190},
			radius: 5,
			color: "red",
			ships: [2, 1, 1, 0, 0, 8, 5]
		}
	],
	
	init: function() {
		
	}
};
