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
	},
	cmdVal: function() {
		var $cmd = kApp.controls.$cmd;
	   	var cmd = $cmd.val();
	   	return cmd;
	}
};