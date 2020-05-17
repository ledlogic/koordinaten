kApp.canvas = {
	$elCanvas: null,
	$elControl: null,
	
	init: function() {
		// canvas
		var $elCanvas = $('#k-canvas');
		kApp.canvas.$elCanvas = $elCanvas;
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
		kApp.canvas.$elCanvas.width(w);
		kApp.canvas.$elCanvas.height(h);

		// control
		var $elControl = $('#k-console');
		$elControl.width(300 - 20);
		$elControl.height(h);
		$elControl.css("left", ww - 300 - 20);
		kApp.canvas.$elControl = $elControl;
		
		// coordinates
		kApp.geom.map.crect = new kApp.geom.crect(0, 0, w, h);
		kApp.geom.map.rrect = new kApp.geom.rrect(-kApp.geom.map.crect.xcenter, -kApp.geom.map.crect.ycenter, kApp.geom.map.crect.xcenter, kApp.geom.map.crect.ycenter);
		kApp.bg.init(kApp.geom.initialSize);
		
		// create canvas
		var crect = kApp.geom.map.crect;
		var c = createCanvas(crect.width, crect.height);
		c.parent('k-canvas');
	}
};