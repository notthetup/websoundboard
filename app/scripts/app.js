
(function(document) {
	'use strict';

	window.addEventListener('WebComponentsReady', function() {
		console.log('WebComponents Ready!');
	});

	window.addEventListener('load', function() {
		var dragCount = 0;
		var buttons = document.querySelectorAll('sound-button');

		document.addEventListener('keydown', keyPressHandler);
		document.addEventListener('keyup', keyPressHandler);

		// document.addEventListener('dragleave', removeDragHover);
		document.addEventListener('drop', function(event) {
			event.preventDefault();
			forEach(buttons, function(thisButton) {
				thisButton.showDragOverlay = false;
			});
		});

		document.addEventListener('dragover', function(event) {
			event.preventDefault();
		});

		document.addEventListener('dragenter', dragenterDragleave);
		document.addEventListener('dragleave', dragenterDragleave);

		window.setTimeout(function() {
			forEach(buttons, function(thisButton, index) {
				thisButton.soundname = 'sound ' + index;
			});
		}, 350);

		function dragenterDragleave(e) {
			e.preventDefault();
			dragCount += (e.type === 'dragenter' ? 1 : -1);
			if (dragCount === 1) {
				if (containsFiles(event)) {
					forEach(buttons, function(thisButton) {
						thisButton.showDragOverlay = true;
					});
				}
			} else if (dragCount === 0) {
				forEach(buttons, function(thisButton) {
					thisButton.showDragOverlay = false;
				});
			}
		}

		function keyPressHandler(evt) {
			if (document.activeElement.tagName !== 'BODY') {
				return;
			}
			forEach(buttons, function(thisButton) {
				thisButton.keyPressHandler(evt);
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
