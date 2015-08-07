define(["knockout", "underscore", "toastr", "services/dataservice"], function (ko, _, toastr, dataservice) {
	'use strict';

	var Place = function (params) {
        var params = params || {};
		this.place = ko.observable(params.place || "");
		this.city = ko.observable(params.city || "");
        this.website = ko.observable(params.website || "");
        //this.placeType = ko.observable();
        //latestUpdated = ko.observable();
	}

	Place.prototype = _.extend(Place.prototype, {
		addPlace: function () {
            var place;
            var self = this;

            if (!this.place() || !this.city()) {
                console.log("You have to fill in city and place");
                return;
            }

            place = {
                _id: new Date().toISOString(),
                city: this.city(),
                place: this.place(),
                website: this.website()
            };
            dataservice.addPlace(place).then(function () {
                toastr.success("Successfully posted a place!");
            }).catch(function (err) {
                console.log(err);
            });

            this.city("");
            this.place("");
            this.website("");
        }
	});

	return Place;
});