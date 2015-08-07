define(["jquery", "knockout", "sammy", "config"], function ($, ko, sammy, config) {
	'use strict';

    var router = {};

    router.start = function (vm) {
    	var def = $.Deferred();
        var self = this;
        var s = sammy('#' + config.appId, function () {
        	this.get("/", function () {
                vm.componentName("start-component");
                vm.params(vm);
        	});

            this.get("#/:component/:city/:place", function (context) {
                vm.componentName(self.getComponentName(context));
                vm.params(context.params);
            });

            this.get("#/:component/:city", function (context) {
                vm.componentName(self.getComponentName(context));
                vm.showPlaces();
            });

            this.get("#/:component", function (context) {
                vm.componentName(self.getComponentName(context));
            });
        });
        s.run('/');
        def.resolve();
        return def.promise();
    };

    router.getComponentName = function (context) {
        return (context.params.component + "-component").toLowerCase();
    }

    return router;
});


// /#/restaurant/malmö/whatever
// /#/searchresult/malmö
// /#/start