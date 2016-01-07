// Importable generic interface for async mongodb CRUD functions.
// all functions are available through dbfunc interface

var settings = require('./settings');

// assign the results -- an object containing the published interface -- of executing this function to dbfunc.
var dbfunc = function(){
	var MongoClient = require('mongodb').MongoClient;

	// Connection URL 
	var url = settings.dbURL;
	var thisdb;
	var collectionName;
	var outstandingQueries = 0;
	
	var init = function(database, collection, onconnect) {
		url = url + '/' + database;
		// Use connect method to connect to the Server 
		MongoClient.connect(url, function(err, thedb) {
			if (err) {
				console.log('Unable to connect to the mongoDB server: ', err);
			} else {
				console.log("Connected to server");
				collectionName = collection;
				thisdb = thedb;
				onconnect();
			}
					
		});
			
	};
	
	// add a document to the currently active database
	var addDoc = function(doc, onCompletion) {
		console.log('add doc ' + JSON.stringify(doc));
		// Insert a single document
		thisdb.collection(collectionName).insertOne(doc, function(err, r) {
			onCompletion(r, err);
		});
	};
	
	var deleteDoc = function(doc, onCompletion) {
		console.log('deleting Doc ' + JSON.stringify(doc));
		thisdb.collection(collectionName).remove( doc, function(err, r) {
		    console.log("Deleted");
			onCompletion(r, err);
		});
	};
	
	var updateDoc = function( idStr, doc, onCompletion) {
		thisdb.collection(collectionName).update( idStr, {"$set" : doc}, {multi:true}, function(err, r) {
			console.log('updating doc ' + JSON.stringify(idStr) + " with " + JSON.stringify(doc));
			onCompletion(r, err);
		});
   };
	
	var listDocs = function(docQuery, onCompletion) {
		console.log('find docs ' + docQuery);
		thisdb.collection(collectionName).find(docQuery).toArray(function(err, docs) {
			console.log("Found the following records");
			console.dir(docs);
			onCompletion(docs,err);
		});
	};
	
	var intervalId;  // interval for reattempting to close database
	
	// the close function won't complete and actually close the database until all async querys are finished.  ie: outstandingQueries == 0
	var close = function() {
		if (outstandingQueries == 0)
		{
			clearInterval(intervalId);
			console.log('closing db');
			thisdb.close();
		}
		else 
		{
			console.log('waiting to close db');
			intervalId = setInterval(close, 1000);
		}
	};

	// return the items which will be visible outside of this function
	return {
		init:init,
		addDoc:addDoc,
		deleteDoc:deleteDoc,
		updateDoc:updateDoc,
		listDocs:listDocs,
		close:close,
	};
}(); // execute the function and return an object containing the interface

// the function has been executed and the dbfunc now contains pointers to the functions
// The global exports object makes functions available for the requires function
exports.init = dbfunc.init;
exports.addDoc = dbfunc.addDoc;
exports.deleteDoc = dbfunc.deleteDoc;
exports.updateDoc = dbfunc.updateDoc;
exports.listDocs = dbfunc.listDocs;
exports.closedb = dbfunc.close;