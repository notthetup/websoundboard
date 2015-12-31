
(function(document) {
	'use strict';

	window.addEventListener('WebComponentsReady', function() {
		console.log('WebComponents Ready!');
	});

	window.addEventListener('load', function() {
		var buttons = document.querySelectorAll('sound-button');

		document.addEventListener('keydown', keyDownListener);
		document.addEventListener('keyup', keyUpListener);

		document.addEventListener('dragend', removeDragHover);
		// document.body.addEventListener('dragleave', removeDragHover);

		document.addEventListener('dragenter', addDragHoverIfFile);
		document.addEventListener('dragover', addDragHoverIfFile);

		forEach(buttons, function(thisButton) {
			thisButton.addEventListener('drop', function(event) {
				removeDragHover(event);
				thisButton.src = event.dataTransfer.files[0];
			});
		});

		function keyDownListener(evt) {
			if (document.activeElement.tagName !== 'BODY') {
				return;
			}
			forEach(buttons, function(thisButton) {
				if (thisButton.keyCode === evt.keyCode &&
					(thisButton.buttonState === 'up' ||
						thisButton.buttonState === 'init')) {
					thisButton.buttonState = 'down';
				}
			});
		}

		function keyUpListener(evt) {
			if (document.activeElement.tagName !== 'BODY') {
				return;
			}
			forEach(buttons, function(thisButton) {
				if (thisButton.keyCode === evt.keyCode && thisButton.buttonState === 'down') {
					thisButton.buttonState = 'up';
				}
			});
		}

		function addDragHoverIfFile(event) {
			event.preventDefault();
			if (containsFiles(event)) {
				forEach(buttons, function(thisButton) {
					thisButton.showDragOverlay = true;
				});
			}
		}

		function removeDragHover(event) {
			event.preventDefault();
			forEach(buttons, function(thisButton) {
				thisButton.showDragOverlay = false;
			});
		}

		function containsFiles(event) {
			if (event.dataTransfer.types) {
				for (var i = 0; i < event.dataTransfer.types.length; i++) {
					if (event.dataTransfer.types[i] === 'Files') {
						return true;
					}
				}
			}
			return false;
		}

		function forEach(array, callback, scope) {
			for (var i = 0; i < array.length; i++) {
				callback.call(scope, array[i], i, array); // passes back stuff we need
			}
		}
	});
})(document);
