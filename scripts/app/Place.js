define(["knockout", "underscore", "toastr", "services/dataservice"], function (ko, _, toastr, dataservice) {
	'use strict';

	var Place = function (params) {
        var params = params || {};
		this.place = ko.observable(params.place || "");
		this.city = ko.observable(params.city || "");
        this.website = ko.observable(params.website || "");
        this.id = ko.observable(params._id || "");
        //this.placeType = ko.observable();
        this.foodTypes = [{ title: 'All vegan', description: 'Rabladaortbf' }, { title: 'Vegeterian', description: 'qwerty' }, { title: 'Mixed', description: 'gfgdfg' }, { title: 'Undefined', description: 'Is not suggested' }];
        //this.additionalFoodOptions = ['Have vegan options', 'Alcohol licence', 'Serve breakfast', 'Serve lunch'];
        this.foodType = ko.observable(params.foodType || "");
        this.lastUpdated = ko.observable(params.lastUpdated || "");
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
                lastUpdated: this.lastUpdated(),
                foodType: this.foodType()
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