var youTubePlayer = (function() {

	var player;

	/**
	 * Creates an <iframe> (and YouTube player)
	 * after the API code downloads.
	 */

	var init = function() {
		player = new YT.Player('player', {
			width: '940',
			height: '530',
			videoId: 'SF-mbO-ANmg',
			playerVars: {
				modestbranding: 1,
				showinfo: 0,
				rel: 0,
				wmode: 'opaque',
				hd : 1
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	};

	/**
	 * Called when the video player is ready.
	 */

	var onPlayerReady = function(event) {
		console.log('onPlayerReady');
		console.log(event);
		var btns = document.getElementsByTagName('button');

		//click events for custom vieo controls.

		for(var i = 0; i < btns.length; i++) {
		    var btn = btns[i];   
		    btn.onclick = function() {
		        var action = this.getAttribute('data-video-action');
	        	handleControls(action);
		        return false;
		    };
		}
	}

	/**
	 * Called when the video player's state changes.
	 */

	var done = false;

	var onPlayerStateChange = function(event) {

		//when playing a video (state=1), 
		//the player should play for six seconds and then stop.

		if (event.data == YT.PlayerState.PLAYING && !done) {
		  setTimeout(stopVideo, 6000);
		  done = true;
		  console.log('video ended');
		}
	};

	/**
	 * Calls custom video control functions. 
	 */

	var handleControls = function(action) {
		switch(action) {
	    	case 'play':
	        	playVideo();
	        	break;
	        case 'pause':
	        	pauseVideo();
	    	break;
	    	case 'stop':
	        	stopVideo();
	    	break;
	    }
	}

	var playVideo = function() {
		player.playVideo();
		console.log('playVideo');
	};

	var pauseVideo = function() {
		player.pauseVideo();
		console.log('pauseVideo');
	}; 

	var stopVideo = function() {
		player.stopVideo();
		console.log('stopVideo');
	};

	return {
		init: init
	}

})();