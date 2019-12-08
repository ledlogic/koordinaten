function setup() {
	kApp.init();
}

function draw() {
	background(30,30,30);
	//kApp.render.stars();
	kApp.render.grid();
	kApp.render.ships();
	kApp.render.fps();
}
