function setup() {
	kApp.init();
}

function draw() {
	background(30,30,30);
	//kApp.render.nebula();
	kApp.render.stars();
	kApp.render.systems();
	kApp.render.ships();
	//kApp.render.test();
	//kApp.render.grid();
	kApp.render.fps();
	kApp.sprites.update();
	
	// mouse pressed
}

function mouseClicked() {
	if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
		kApp.log("clicked");
		var cPt = new kApp.geom.cPt(mouseX, mouseY);
		var rPt = kApp.geom.cPt2rPt(cPt.x, cPt.y);
		var system = kApp.game.ptInSystem(rPt);
		kApp.events.selectSystem(system);
	}
}
