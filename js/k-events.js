kApp.events = {
	init: function() {
		
	},
	cmdEnter: function() {
		var val = kApp.controls.cmdVal();
	   	console.log(val);
	},
	build: function() {
		
	},
	move: function() {
		
	},
	info: function() {
		
	},
	selectSystem: function(s) {
		if (!s || !s.selected) {
			_.each(kApp.game.systems, function(system) {
				system.selected = false;
			});
			if (s) {
				s.selected = true;
			}
		}
	}
}
