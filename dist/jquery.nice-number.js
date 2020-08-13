(function ($) {
	$.fn.niceNumber = function (options) {
		var defaults = {
			autoSize: true,
			autoSizeBuffer: 1,
			buttonDecrement: '-',
			buttonIncrement: '+',
			buttonPosition: 'around',
			onIncr: false,
			onDecr: false,
		};
		/**
      callbackFunction
      @param {$input} currentInput - the input running the callback
      @param {number} amount - the amount after increase/decrease
      @param {object} settings - the passed niceNumber settings
     */
		var settings = $.extend(defaults, options);

		return this.each(function () {
			var currentInput = this,
				$currentInput = $(currentInput),
				attrMax = null,
				attrMin = null;

			// Skip already initialized input
			if ($currentInput.attr('data-nice-number-initialized')) return;

			// Handle max and min values
			if (
				typeof $currentInput.attr('max') !== typeof undefined &&
				$currentInput.attr('max') !== false
			) {
				attrMax = parseFloat($currentInput.attr('max'));
			}

			if (
				typeof $currentInput.attr('min') !== typeof undefined &&
				$currentInput.attr('min') !== false
			) {
				attrMin = parseFloat($currentInput.attr('min'));
			}

			// Fix issue with initial value being < min
			if (attrMin && !currentInput.value) {
				$currentInput.val(attrMin);
			}

			// Generate container
			var $inputContainer = $('<div/>', {
				class: 'nice-number',
			}).insertAfter(currentInput);

			// Generate interval (object so it is passed by reference)
			var interval = {};

			// Generate buttons
			var $minusButton = $('<button/>')
				.attr('type', 'button')
				.html(settings.buttonDecrement)
				.on('mousedown mouseup mouseleave', function (event) {
					changeInterval(event.type, interval, function () {
						if (
							attrMin == null ||
							attrMin < parseFloat(currentInput.value)
						) {
							currentInput.value--;
							if (settings.onDecr) {
								settings.onDecr(
									$currentInput,
									currentInput.value,
									settings
								);
							}
						}
					});

					// Trigger the input event here to avoid event spam
					if (event.type == 'mouseup' || event.type == 'mouseleave') {
						$currentInput.trigger('input');
					}
				});

			var $plusButton = $('<button/>')
				.attr('type', 'button')
				.html(settings.buttonIncrement)
				.on('mousedown mouseup mouseleave', function (event) {
					changeInterval(event.type, interval, function () {
						if (
							attrMax == null ||
							attrMax > parseFloat(currentInput.value)
						) {
							currentInput.value++;
							if (settings.onIncr) {
								settings.onIncr(
									$currentInput,
									currentInput.value,
									settings
								);
							}
						}
					});

					// Trigger the input event here to avoid event spam
					if (event.type == 'mouseup' || event.type == 'mouseleave') {
						$currentInput.trigger('input');
					}
				});

			// Remember that we have initialized this input
			$currentInput.attr('data-nice-number-initialized', true);

			// Append elements
			switch (settings.buttonPosition) {
				case 'left':
					$minusButton.appendTo($inputContainer);
					$plusButton.appendTo($inputContainer);
					$currentInput.appendTo($inputContainer);
					break;
				case 'right':
					$currentInput.appendTo($inputContainer);
					$minusButton.appendTo($inputContainer);
					$plusButton.appendTo($inputContainer);
					break;
				case 'around':
				default:
					$minusButton.appendTo($inputContainer);
					$currentInput.appendTo($inputContainer);
					$plusButton.appendTo($inputContainer);
					break;
			}

			// Nicely size input
			if (settings.autoSize) {
				$currentInput.width(
					$currentInput.val().length + settings.autoSizeBuffer + 'ch'
				);
				$currentInput.on('keyup input', function () {
					$currentInput.animate(
						{
							width:
								$currentInput.val().length +
								settings.autoSizeBuffer +
								'ch'
						},
						200
					);
				});
			}
		});
	};

	function changeInterval(eventType, interval, callback) {
		if (eventType == 'mousedown') {
			interval.timeout = setTimeout(function () {
				interval.actualInterval = setInterval(function () {
					callback();
				}, 100);
			}, 200);
			callback();
		} else {
			if (interval.timeout) {
				clearTimeout(interval.timeout);
			}
			if (interval.actualInterval) {
				clearInterval(interval.actualInterval);
			}
		}
	}
})(jQuery);
