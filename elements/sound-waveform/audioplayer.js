function AudioPlayer(context) {

	if (!context) {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();
	}

	this._context = context;

	this._player = this._context.createBufferSource();
	this._fader = this._context.createGain();
	this._player.onended = function() {
		this.state = 'stop';
	}.bind(this);
	this._player.connect(this._fader);

	this._currentPosition = 0;
	this._startTime = 0;

	this._gain = 1;
	this._fadeIn = 0.05;
	this._fadeOut = 0.3;

	this._buffer = null;
	Object.defineProperty(this, 'buffer', {
		set: function(newValue) {
			if (newValue instanceof AudioBuffer) {
				this._buffer = newValue;
				if (!this._player.buffer) {
					this._player.buffer = this._buffer;
				} else {
					this._player = this._context.createBufferSource();
					this._player.buffer = this._buffer;
					this._player.loop = this.playMode === 'hold';
					this._player.onended = function() {
						this.state = 'stop';
					}.bind(this);
					this._player.connect(this._fader);
				}
			}
		},
		get: function() {
			return this._buffer;
		}
	});

	this._mode = 'trigger';
	Object.defineProperty(this, 'mode', {
		set: function(newValue) {
			if (newValue === 'trigger' || newValue === 'hold') {
				this._player.loop = newValue === 'hold';
				this._mode = newValue;
			}
		},
		get: function() {
			return this._mode;
		}
	});
}

AudioPlayer.prototype.start = function() {

	this._startTime = this._context.currentTime;

	this._fader.gain.setValueAtTime(0, this._context.currentTime);
	this._fader.gain.linearRampToValueAtTime(this._gain, this._context.currentTime + this._fadeIn);

	this._player.start(this._context.currentTime, this._currentPosition);

	this._fader.gain.setValueAtTime(this._gain,
		this._context.currentTime + this.buffer.duration - this._fadeOut);
	this._fader.gain.linearRampToValueAtTime(0, this._context.currentTime + this.buffer.duration);

	if (this.mode === 'trigger') {
		this._player = this._context.createBufferSource();
		this._fader = this._context.createGain();
		this._player.buffer = this._buffer;
		this._player.loop = this.playMode === 'hold';
		this._player.onended = function() {
			this.state = 'stop';
		}.bind(this);
		this._player.connect(this._fader);
		this._fader.connect(this._outputNode);

		this._currentPosition = 0;
	}
};

AudioPlayer.prototype.pause = function() {
	this._fader.gain.setValueAtTime(this._gain, this._context.currentTime);
	this._fader.gain.linearRampToValueAtTime(0, this._context.currentTime + this._fadeOut);
	this._player.stop(this._context.currentTime + this._fadeOut);

	this._currentPosition = this._context.currentTime - this._startTime;
};

AudioPlayer.prototype.connect = function(outputNode) {
	this._outputNode = outputNode;
	this._fader.connect(this._outputNode);
};

window.AudioPlayer = AudioPlayer;
