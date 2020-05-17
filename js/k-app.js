var kApp = {
	init: function() {
		kApp.canvas.init();
		kApp.game.init();
		kApp.sprites.init();
		kApp.controls.init();
		kApp.events.init();
		kApp.render.init();
	},
	log: function(s) {
		console.log(s);
	}
};

//$(window).on('scroll resize', getVisible);
function windowResized() {
	//kApp.sizeCanvas();
}
