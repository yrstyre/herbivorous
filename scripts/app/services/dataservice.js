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
	},

	ds.getPlaceByPlaceNameAndCity = function (city, place) {
		return ds.getAllPlaces().then(function (allPlaces) {
			return _.find(allPlaces.rows, function(row) {
	            return row.doc.city.toLowerCase() === city.toLowerCase() && row.doc.place.toLowerCase() === place.toLowerCase();
	        });
		});
	},

	ds.updatePlace = function (data) {
		return dbConnection.get(data.id()).then(function (doc) {
			return dbConnection.put({
			    _id: doc._id,
			    _rev: doc._rev,
			    city: data.city(),
			    place: data.place(),
			    website: data.website(),
			    lastUpdated: new Date().toISOString(),
			    foodType: data.foodType()
			});
		});
	}
	return ds;
});