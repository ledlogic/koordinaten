function setup() {
	kApp.init();
}

function draw() {
	kApp.render.bg();
	
	if (kApp.game.settings.paused) {
		
	} else {
		//kApp.render.nebula();
		kApp.render.stars();
		kApp.render.moves();
		kApp.render.systems();
		kApp.render.phenomena();
		kApp.render.grid();
		kApp.render.fleets();
		kApp.render.fps();
		kApp.render.news();
		kApp.sprites.update();
		kApp.game.update();
	}	
}

function checkBoundaries() {
	return mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height;
}

function mouseClicked() {
	if (checkBoundaries()) {
		var cPt = new kApp.geom.cPt(mouseX, mouseY);
		var rPt = kApp.geom.cPt2rPt(cPt.x, cPt.y);
		var system = kApp.game.ptInSystem(rPt);
		
		if (system && !system.destination) {
			kApp.events.selectSystem(system);	
		} else if (system && system.destination) {
			kApp.events.moveStarted();
		} else if (system && system.selected) {
			// deselect?
		} else if (!system) {
			if (kApp.game.selectedSystemHasDestinationCount()) {
				kApp.game.clearSelectedSystemDestinationCount();
			} else {
				kApp.events.selectSystem(system);
			}
		}
	}
}

function mousePressed() {
	if (checkBoundaries()) {
		kApp.events.potentialMove();
	}
}

function mouseDragged() {
	if (checkBoundaries()) {
		kApp.events.potentialMove();
	}
}
