// hand coded pure javascript RESTfull server script using singleton database connection to handle all requests
//var https = require('https');
//var http = require('http');
var url = require('url');
var thisdb = require('./mdb');
var settings = require('./settings');
var fs = require('fs');  // ssh support
var qs = require('querystring');
var express = require('express');
var bodyParser = require('body-parser');


var WebInterface = {
	"List": "http://server host:port/application = GET  (all applications)",
	"Get": "http://server host:port/application?name=XXX = GET  (single person's application)",
	"Add": "http://server host:port/application = POST (data) (insert a person's application)",
	"Update": "http://server host:port/application = PUT  (data) (update a person's application)",
	"Delete": "http://server host:port/application = DELETE  (delete a person's application)"
};

// options for ssh
var options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};


// an error has occurred, send it, close the response
var sendError = function(errNo, err, res ) {
	res.writeHead(errNo, "Error", {
		"Content-Type": "application/json"
	});
	res.write(JSON.stringify({
		"Error": err
	}) + "\n"); // the \n is just to make it print nicely using curl.  Don't know if this will cause issues with client side or not.
	res.end();
	console.log(err);
};

// A database error occurred, send an error, close the response
var sendDBError = function(err, res) {
	res.writeHead(settings.FAILURE, "Database Error", {
		"Content-Type": "application/json"
	});
	res.write(JSON.stringify({
		"DB Error": err
	}) + "\n");
	res.end();
	console.log(err);
};

// We have successfully executed the query, return the results of that query
var sendDBResults = function(results, res) {
	res.writeHead(settings.SUCCESS, {
		"Content-Type": "application/json",
	});
	//res.json(results);
	res.write(JSON.stringify(results) + "\n");
	res.end();
	console.log("Success: " + JSON.stringify(results));
};

// onCompletion is called when a database function has completed. This is where we send the response
var onCompletion = function(results, err, context) {
	if (err != null) {
		sendDBError(err, context['res']);
	}
	else {
		console.log("Completed " + context['req'].method);
		sendDBResults(results, context['res']);
	}
};

var app = express();

// Use jade template engine to parse static files
//app.set('view engine', 'jade');

//app.use(bodyParser.json()); // for parsing application/json

app.use("/", function(req, res, next) {
  console.log('req: ' + req.method + ' url = ' +req.url);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

// query application docs
app.get(settings.applicationQueryUrl, function(req, res) {
	var qs = url.parse( req.url, true ).query;
	thisdb.listDocs(qs, onCompletion, { "req":req,"res":res });
});

// get one application doc
app.get(settings.applicationUrl, function(req, res) {
	var qs = url.parse( req.url, true ).query;
	if ( Object.keys(qs).length > 0) {
		thisdb.listKeyDocs(qs, onCompletion, { "req":req,"res":res });
	} else {
		thisdb.listDocs(qs, onCompletion, { "req":req,"res":res });
	}
});

// add one application doc to the database,
// if we are posting, grab chunks from client until the end and build the query.
app.post(settings.applicationUrl, function(req, res) {
	var reqBody = '';
	req.on("data", function(data) {
		reqBody += data;
		if (reqBody.length > 1e7) { //1MB
			// send 413 - request too large
		}
	});
	req.on("end", function() {   
		try {  // JSON parse will throw an error with invalid JSON, so need to catch it here.  This will not be caught by handle, since it is an asynchronis function and not in the call stack
			var query = JSON.parse(reqBody); // This is from the video in note 10.  Not sure how this works yet.
			thisdb.addDoc(query, onCompletion, { "req":req,"res":res });
		}
		catch (ex) {
	//				sendError(settings.FAILURE, "" + ex);
			var query2 = qs.parse(reqBody);
			thisdb.addDoc(query2, onCompletion, { "req":req,"res":res });
		}
	
	});
	
});


// update a single application
app.put(settings.applicationUrl, function(req, res) {
	var reqBody = req.body;
	thisdb.updateDoc(reqBody[0], reqBody[1], onCompletion, { "req":req,"res":res });
});

// delete a single application
app.delete(settings.applicationUrl, function(req, res) {
	thisdb.deleteDoc(url.parse(req.url, true).query, onCompletion, { "req":req,"res":res });
});

// This is a stub showing the use of Jade engine
app.get("/view", function(req, res) {
	res.render('index', {
		title: 'Hey',
		message: 'Hello there!'
	});
});

// catch and log anything that falls through the stack as an error
app.use(function(err, req, res, next) {
  console.error(err.type + ": " + err.body);
  res.status(settings.FAILURE).send('Something broke!\n');
  next(); // pass it on to other error handler - if any.
});

var ondbconnect = function() {
	console.log("Listening on port " + settings.listenPort);
	app.listen(settings.listenPort);
};

var ondberr = function() {
	process.exit(1);
};

var exitServer = function() {
	console.log("Closing database connection");
	thisdb.closedb();
	console.log("Goodbye");
	process.exit(0);
};

process.on('SIGINT', exitServer);

// all the processing goodness starts here.
thisdb.init(settings.database, settings.collection, ondbconnect, ondberr);