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
		alert("moveStarted");
	}
}
