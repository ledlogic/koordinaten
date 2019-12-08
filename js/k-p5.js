function setup() {
	kApp.init();
}

function draw() {
	background(30,30,30);
	kApp.render.stars();
	kApp.render.systems();
	kApp.render.ships();
	kApp.render.test();
	kApp.render.grid();
	kApp.render.fps();
	kApp.sprites.update();
}
