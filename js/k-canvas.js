kApp.canvas = {
	$elCanvas: null,
	$elControl: null,
	
	init: function() {
		kApp.canvas.sizeCanvas();
	},
	sizeCanvas: function() {
		// @see http://jsfiddle.net/b5DGj/7/
		var ww = document.body.clientWidth;
		var wh = document.body.clientHeight;
		var $h = $("header");
		var hms = parseInt($h.css("marginTop"),10);
		var hh = $h.height();
		var $f = $("footer");
		var fms = parseInt($f.css("marginTop"),10);
		var fh = $f.height();
		var w = ww - 300 - 40;
		var h = wh - hh - hms * 2 - fh - fms * 2;
		
		// canvas
		var $elCanvas = $('#k-canvas');
		$elCanvas.width(w);
		$elCanvas.height(h);
		kApp.canvas.$elCanvas = $elCanvas;

		// control
		var $elControl = $('#k-console');
		$elControl.width(300 - 20);
		$elControl.height(h);
		$elControl.css("left", ww - 300 - 20);
		kApp.canvas.$elControl = $elControl; 
		kApp.geom.map.rrect = new kApp.geom.rrect(-500, -500, 500, 500);
		kApp.geom.map.crect = new kApp.geom.crect(0, 0, w, h);
		kApp.bg.init(kApp.geom.initialSize);
		
		// create canvas
		var crect = kApp.geom.map.crect;
		var c = createCanvas(crect.width, crect.height);
		c.parent('k-canvas');
	}
};