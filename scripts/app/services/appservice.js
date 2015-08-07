define(["knockout", "services/router", "Start"], function (ko, router, Start) {
	'use script';

	var app = {};

	app.start = function () {
		var vm = new Start();
		router.start(vm);
		ko.applyBindings(vm);
	}

	return app;
});