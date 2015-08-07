define(["knockout", "underscore", "modules/dbConnection", "toastr", "services/router", "services/dataservice"], function (ko, _, dbConnection, toastr, router, dataservice) {
    "use strict";

    function Start() {
        this.searchQuery = ko.observable();
        this.chosenCityPlaces = ko.observableArray();
        this.allPlaces = ko.observableArray();

        this.componentName = ko.observable();
        this.params = ko.observable();
    }

    Start.prototype = _.extend(Start.prototype, {

        showPlaces: function () {
            var self = this;
            dataservice.getAllPlaces().then(function (result) {
                return result.rows;
            }).then(function (allPlaces) {
                if (allPlaces.length) {
                    var searchResult = dataservice.getAllPlacesByQuery(allPlaces, self.searchQuery());
                    console.log(allPlaces);

                    if (!searchResult.length) {
                        self.chosenCityPlaces(allPlaces);
                    } else {
                        self.chosenCityPlaces(searchResult);
                    }
                }
            });
                
        },

        removePlace: function (place) {
            if (window.confirm("Are you sure you want to remove this?")) {
                dataservice.removePlace(place, this);
            }
        }
    });

    return Start;
});