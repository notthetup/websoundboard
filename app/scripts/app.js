
(function(document) {
	'use strict';

	window.addEventListener('WebComponentsReady', function() {
		console.log('WebComponents Ready!');
	});

	window.addEventListener('load', function() {
		var buttons = document.querySelectorAll('sound-button');

		document.addEventListener('keydown', keyPressHandler);
		document.addEventListener('keyup', keyPressHandler);

		document.addEventListener('dragend', removeDragHover);
		// document.body.addEventListener('dragleave', removeDragHover);

		document.addEventListener('dragenter', addDragHoverIfFile);
		document.addEventListener('dragover', addDragHoverIfFile);

		function keyPressHandler(evt) {
			if (document.activeElement.tagName !== 'BODY') {
				return;
			}
			forEach(buttons, function(thisButton) {
				thisButton.keyPressHandler(evt);
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
