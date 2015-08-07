define(["knockout", "underscore", "toastr", "services/dataservice"], function (ko, _, toastr, dataservice) {
	'use strict';

	var Place = function () {
		this.place = ko.observable();
		this.city = ko.observable();
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
                placeName: this.place()
            };
            dataservice.addPlace(place).then(function () {
                toastr.success("Successfully posted a place!");
            }).catch(function (err) {
                console.log(err);
            });

            this.city("");
            this.place("");
        }
	});

	return Place;
});