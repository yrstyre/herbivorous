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
                var searchResult;
                if (!allPlaces.length) {
                    toastr.error("There are no places registered yet!");
                }

                if(!self.searchQuery()) {
                    self.chosenCityPlaces(self.sampleSearchResult(allPlaces));
                } else {
                    searchResult = dataservice.getAllPlacesByQuery(allPlaces, self.searchQuery());
                    if (!searchResult.length) {
                        self.chosenCityPlaces([]);
                    } else {

                        self.chosenCityPlaces(self.sampleSearchResult(searchResult));
                    }
                }
            });
                
        },

        removePlace: function (place) {
            if (window.confirm("Are you sure you want to remove this?")) {
                dataservice.removePlace(place, this);
            }
        },

        sampleSearchResult: function (searchResult) {
            return _.sample(searchResult, 5);
        }
    });

    return Start;
});