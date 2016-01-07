// Importable generic interface for async mongodb CRUD functions.
// all functions are available through dbfunc interface

var settings = require('./settings');

var stripEmptyValues = function(query) {
		var valueQuery = {};
		// Insert a single document
		for (var key in query) {
			var attrName = key;   // should we check for hasownproperty?  Seems to work fine without it
			var attrValue = query[key];
			if (attrValue) {
				valueQuery[attrName] = attrValue;
			}
		}
		return valueQuery;
};

// retrieve the properties which make up the unique key.
var getKeyFromQuery = function(query)
{
	var arrayLength = settings.keyfields.length;
	var key = {};
	for (var i = 0; i < arrayLength; i++) {
		var fieldName = settings.keyfields[i];
		var fieldValue = query[fieldName];
		key[fieldName] = fieldValue;
	}
	return key;
};

var validKey = function(query)
{
	var arrayLength = settings.keyfields.length;
	for (var i = 0; i < arrayLength; i++) {
		var fieldName = settings.keyfields[i];
		if (!query[fieldName]) {
			return false;
		}
	}
	return true;

};

// assign the results -- an object containing the published interface -- of executing this function to dbfunc.
var dbfunc = function() {
	var MongoClient = require('mongodb').MongoClient;

	// Connection URL 
	var url = settings.dbURL;
	var thisdb;
	var collectionName;
	var outstandingQueries = 0;

	var init = function(database, collection, ondbconnect, ondberr) {
		url = url + '/' + database;
		// Use connect method to connect to the Server 
		MongoClient.connect(url, function(err, thedb) {
			if (err) {
				console.log('Unable to connect to the mongoDB server: ', err);
				ondberr();
			}
			else {
				console.log("Connected to server");
				collectionName = collection;
				thisdb = thedb;
				ondbconnect();
			}
		});

	};

	// add a document to the currently active database
	var addDoc = function(doc, onCompletion, context) {
		if (!validKey(doc))
		{
			onCompletion("Error","Invalid Key:" + JSON.stringify(doc), context);
		}
		else
		{
			var valueQuery = stripEmptyValues(doc);
			console.log('add doc ' + JSON.stringify(valueQuery));
			thisdb.collection(collectionName).insertOne(valueQuery, function(err, r) {
				onCompletion(r, err, context);
			});
		}
	};

	var deleteDoc = function(doc, onCompletion, context) {
		if (!validKey(doc))
		{
			onCompletion("Error","Invalid Key:" + JSON.stringify(doc), context);
		}
		else
		{
			var query = getKeyFromQuery(doc);
			console.log('deleting Doc ' + JSON.stringify(query));
			thisdb.collection(collectionName).remove(query, function(err, r) {
				console.log("Deleted");
				onCompletion(r, err, context);
			});
		}
	};

	var updateDoc = function(idStr, doc, onCompletion, context) {
		if (!validKey(idStr))
		{
			onCompletion("Error","Invalid Key:" + JSON.stringify(idStr), context);
		}
		else
		{
			thisdb.collection(collectionName).update(idStr, {"$set": doc}, {multi: false}, function(err, r) {
				console.log("updating doc " + JSON.stringify(idStr) + " with " + JSON.stringify(doc));
				onCompletion(r, err, context);
			});
		}
	};

	var listKeyDocs = function(docQuery, onCompletion, context) {
		if (!validKey(docQuery))
		{
			onCompletion("Error","Invalid Key:" + JSON.stringify(docQuery), context);
		}
		else
		{
			var valueQuery = getKeyFromQuery(docQuery);
			console.log('find docs where ' + JSON.stringify(valueQuery));
	
			thisdb.collection(collectionName).find(valueQuery).toArray(function(err, docs) {
				console.log("Found the following records");
				console.dir(docs);
				onCompletion(docs, err, context);
			});
		}
	};

	var listDocs = function(docQuery, onCompletion, context) {
		console.log('find all docs where ' + JSON.stringify(docQuery));

		thisdb.collection(collectionName).find(docQuery).toArray(function(err, docs) {
			console.log("Found the following records");
			console.dir(docs);
			onCompletion(docs, err, context);
		});
	};
	
	var intervalId; // interval for reattempting to close database

	// the close function won't complete and actually close the database until all async querys are finished.  ie: outstandingQueries == 0
	var close = function() {
		if (outstandingQueries == 0) {
			clearInterval(intervalId);
			console.log('closing db');
			thisdb.close();
		}
		else {
			console.log('waiting to close db');
			intervalId = setInterval(close, 1000);
		}
	};

	// return the items which will be visible outside of this function
	return {
		init: init,
		addDoc: addDoc,
		deleteDoc: deleteDoc,
		updateDoc: updateDoc,
		listKeyDocs: listKeyDocs,
		listDocs: listDocs,
		close: close,
	};
}(); // execute the function and return an object containing the interface

// the function has been executed and the dbfunc now contains pointers to the functions
// The global exports object makes functions available for the requires function
exports.init = dbfunc.init;
exports.addDoc = dbfunc.addDoc;
exports.deleteDoc = dbfunc.deleteDoc;
exports.updateDoc = dbfunc.updateDoc;
exports.listKeyDocs = dbfunc.listKeyDocs;
exports.listDocs = dbfunc.listDocs;
exports.closedb = dbfunc.close;