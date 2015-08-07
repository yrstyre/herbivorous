define(["knockout", "Place",
	"text!components/restaurant-component.html",
	"text!components/searchResult-component.html",
	"text!components/start-component.html",
	"text!components/contribute-component.html",
	"text!components/about-component.html"], function (ko, Place, restaurantComponent, searchResultComponent, startComponent, contributeComponent, aboutComponent) {

	'use strict';

	ko.components.register('restaurant-component', {
		viewModel: function(params) {
	    	this.params = ko.observable(params);
	    },
        template: restaurantComponent
    });

    ko.components.register('searchResult-component', {
		viewModel: function(params) {
	        this.params = ko.observable(params);
	    },
        template: searchResultComponent
    });

    ko.components.register('start-component', {
		viewModel: function(params) {
	        this.params = ko.observable(params);
	    },
        template: startComponent
    });

    ko.components.register('contribute-component', {
		viewModel: Place,
        template: contributeComponent
    });

    ko.components.register('about-component', {
		viewModel: function(params) {
	        this.params = ko.observable(params);
	    },
        template: aboutComponent
    });
	
});