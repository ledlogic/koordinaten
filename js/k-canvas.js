kApp.canvas = {
	$el: null,
	
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
		//kApp.log([wh,hms,hh,fh,h]);		
		var $elCanvas = $('#k-canvas');
		$elCanvas.width(w);
		$elCanvas.height(h);
		kApp.canvas.$el = $elCanvas;

		var $elControl = $('#k-console');
		$elControl.width(300 - 20);
		$elControl.height(h);
		$elControl.css("left", ww - 300 - 20);
		
  	    var w = Math.floor($("#k-canvas").width());
		var h = Math.floor($("#k-canvas").height());
		//kApp.log([w,h]);
		var rect = new kApp.geom.rect(-w/2, w/2, -h/2, h/2);
		var size = new kApp.geom.csize(w, h, rect);
		//kApp.log(size);
		var initialSize = kApp.geom.initialSize;
		kApp.geom.initialSize = size;
		kApp.geom.size = kApp.geom.initialSize;
		if (!kApp.bg.initialized) {
			kApp.bg.init(kApp.geom.initialSize);
		}

		var c = createCanvas(kApp.geom.size.cWidth, kApp.geom.size.cHeight);
		c.parent('k-canvas');
	}
};