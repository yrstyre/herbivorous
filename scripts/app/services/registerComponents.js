define(["knockout", "Start", "Place",
	"text!components/restaurant-component.html",
	"text!components/edit-component.html",
	"text!components/searchResult-component.html",
	"text!components/start-component.html",
	"text!components/contribute-component.html",
	"text!components/about-component.html"], function (ko, Start, Place, restaurantComponent, editComponent, searchResultComponent, startComponent, contributeComponent, aboutComponent) {

	'use strict';

	ko.components.register('restaurant-component', {
		viewModel: Place,
        template: restaurantComponent
    });

    ko.components.register('edit-component', {
		viewModel: Place,
        template: editComponent
    });

    ko.components.register('searchResult-component', {
		viewModel: function(params) {
	        this.params = ko.observable(params);
	    },
        template: searchResultComponent
    });

    ko.components.register('start-component', {
		viewModel: Start,
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