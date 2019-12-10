kApp.controls = {
	$cmd: null,
	
	init: function() {
		var $cmd = $("#cmd");
		$cmd.on('keypress',function(e) {
		    if(e.which == 13) {
		    	kApp.events.cmdEnter();
		    }
		});
		kApp.controls.$cmd = $cmd;
		
		var $build = $("#build");
		$build.on('click',function(e) {
			kApp.events.build();
		});

		var $enter = $("#enter");
		$enter.on('click',function(e) {
			kApp.events.cmdEnter();
		});

		var $info = $("#info");
		$info.on('click',function(e) {
			kApp.events.info();
		});

		var $move = $("#move");
		$move.on('click',function(e) {
			kApp.events.move();
		});
	},
	cmdVal: function() {
		var $cmd = kApp.controls.$cmd;
	   	var cmd = $cmd.val();
	   	return cmd;
	}
};
