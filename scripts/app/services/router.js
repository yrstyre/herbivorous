define(["jquery", "knockout", "sammy", "config", "services/dataservice"], function ($, ko, sammy, config, dataservice) {
	'use strict';

    var router = {};

    router.start = function (vm) {
    	var def = $.Deferred();
        var self = this;
        var s = sammy('#' + config.appId, function () {
        	this.get("/", function () {
                vm.componentName("start-component");
        	});

            this.get("#/:component/:city/:place", function (context) {
                vm.componentName(self.getComponentName(context));
                dataservice.getPlaceByPlaceNameAndCity(context.params.city, context.params.place).then(function (placeData) {
                    console.log(placeData.doc);
                    vm.params(placeData.doc);
                });
                
            });

            this.get("#/:restaurant/:city/:place/:component", function (context) {
                vm.componentName(self.getComponentName(context));
                dataservice.getPlaceByPlaceNameAndCity(context.params.city, context.params.place).then(function (placeData) {
                    console.log(placeData.doc);
                    vm.params(placeData.doc);
                });
                
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