var kApp = {
	init: function() {
		kApp.canvas.init();
		kApp.sprites.init();
	},
	log: function(s) {
		console.log(s);
	}
};

//$(window).on('scroll resize', getVisible);
function windowResized() {
	//kApp.sizeCanvas();
}
