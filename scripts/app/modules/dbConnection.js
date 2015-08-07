define(["PouchDB"], function (PouchDB) {

    'use strict';

    var db = function dbConnection() {
        return new PouchDB('places');
    }

    return db();

    
});