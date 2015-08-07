define(["knockout", "modules/dbConnection"], function (ko, dbConnection) {
	'use strict';

	var ds = {};

	ds.getAllPlacesByQuery = function (allPlaces, query) {
		if(query) {
			return _.filter(allPlaces, function(row) {
	            return row.doc.city.toLowerCase() === query.toLowerCase();
	        });
		}
		
		return [];
	},

	ds.getAllPlaces = function () {
		return dbConnection.allDocs({include_docs: true, descending: true}).catch(function (err) {
  			//console.log(err);
		});
	},

	ds.addPlace = function (place) {
		return dbConnection.put(place);
	},

	ds.removePlace = function (place, self) {
		dbConnection.remove(place.doc).then(function () {
			self.chosenCityPlaces.remove(place);
			console.log("removed!");
		}).catch(function (err) {
  			console.log(err);
		});
	}
	return ds;
});