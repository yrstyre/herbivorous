define(["knockout", "underscore", "toastr", "services/dataservice"], function (ko, _, toastr, dataservice) {
	'use strict';

	var Place = function (params) {
        var params = params || {};
		this.place = ko.observable(params.place || "");
		this.city = ko.observable(params.city || "");
        this.website = ko.observable(params.website || "");
        this.id = ko.observable(params._id || "");
        //this.placeType = ko.observable();
        //this.foodType = ko.observable();
        this.lastUpdated = ko.observable();
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
                website: this.website(),
                lastUpdated: this.lastUpdated()
            };
            dataservice.addPlace(place).then(function () {
                toastr.success("Successfully posted a place!");
            }).catch(function (err) {
                console.log(err);
            });

            this.city("");
            this.place("");
            this.website("");
        },

        updatePlace: function (updateData) {
            dataservice.updatePlace(updateData).then(function () {
                toastr.success("Successfully updated!");
            })
            .catch(function (err) {
                console.log(err);
            });
        }
	});

	return Place;
});