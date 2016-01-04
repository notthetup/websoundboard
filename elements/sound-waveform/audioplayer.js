/* jshint ignore:start */
// jscs:disable

(function(window){
	function AudioPlayer (context){
		if (!context){
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			context = new AudioContext();
		}

		this._context = context;

		this._player = this._context.createBufferSource();
		this._fader = this._context.createGain();
		this._player.buffer = buffer;
		this._player.loop = this.playMode === PLAY_MODE.HOLD;
		this._player.onended = function() {
			this.state = STATE.STOP;
		}.bind(this);
		this._player.connect(this._fader);
		this._fader.connect(this._gain);

		Object.defineProperty(this, 'gain', {
			set: function(){

			},
			get: function(){

			}
		});

		Object.defineProperty(this, 'buffer', {
			set: function(){

			},
			get: function(){

			}
		});

		Object.defineProperty(this, 'fadeIn', {
			set: function(){

			},
			get: function(){

			}
		});

		Object.defineProperty(this, 'fadeOut', {
			set: function(){

			},
			get: function(){

			}
		});

	}

	AudioPlayer.prototype.start = function(){

	}

	AudioPlayer.prototype.pause = function(){

	}

	window.AudioPlayer = AudioPlayer;
})(window);
