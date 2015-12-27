
(function(document) {
	'use strict';

	window.addEventListener('WebComponentsReady', function() {
		console.log('WebComponents Ready!');
	});

	window.addEventListener('load', function() {
		var buttons = document.querySelectorAll('sound-button');

		document.addEventListener('keydown', keyDownListener);
		document.addEventListener('keyup', keyUpListener);

		function keyDownListener(evt) {
			if (document.activeElement.tagName !== 'BODY') {
				return;
			}
			for (var index = 0; index < buttons.length; index++) {
				var thisButton = buttons[index];
				if (thisButton.keyCode === evt.keyCode &&
					(thisButton.buttonState === 'up' ||
						thisButton.buttonState === 'init')) {
					thisButton.buttonState = 'down';
				}
			}
		}

		function keyUpListener(evt) {
			if (document.activeElement.tagName !== 'BODY') {
				return;
			}
			for (var index = 0; index < buttons.length; index++) {
				var thisButton = buttons[index];
				if (thisButton.keyCode === evt.keyCode && thisButton.buttonState === 'down') {
					thisButton.buttonState = 'up';
				}
			}
		}
	});
})(document);
