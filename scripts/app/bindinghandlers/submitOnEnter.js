define(["knockout"], function (ko) {
	'use script';

	ko.bindingHandlers.submitOnEnter = {
		init: function (element, valueAccessor) {
			var $element = $(element);
			var options = valueAccessor();
			$element.find('input[type=text]').on('keyup', function(e) {
				console.log();
				var test;
			    if (e.which === 13) {
			    	options.submitAction();
			    }


			});

			console.log(element);
			console.log(options);
		}
 	}

});