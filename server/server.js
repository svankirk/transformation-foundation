var http = require('http');
var url = require('url');
// hand coded pure javascript RESTfull server script using singleton database connection to handle all requests
var thisdb = require('./mdb');
var settings = require('./settings');

var WebInterface = {
	"http://server host:port/application = ": "GET  (all applications)",
	"http://server host:port/application?name=XXX = ": "GET  (single person's application)",
	"http://server host:port/application = ": "POST (data) (insert a person's application)",
	"http://server host:port/application = ": "PUT  (data) (update a person's application)",
	"http://server host:port/application = ": "DELETE  (delete a person's application)",
};


// a new instance of this function is created for each message that comes in.  All handling functions have access to the request and response object.
var HtmlMessageHandler = function(req, resp) {
	var thisReq = req;
	var thisResp = resp;
	var parsedReq = url.parse(thisReq.url, true); // the details of the incoming request is encoded in the url used for the request

	var _handler = {};
	var allHandlers = {};

	_handler.handle = function() {
		try {
			var hname = "handle" + thisReq.method; // all handler methods have the form of "handleXXXX" where XXX is the request method

			if (parsedReq.pathname !== settings.getUrl) {
				sendError(settings.UNKNOWN, "Unknown request");
			}
			else {
				if ( allHandlers[hname] == null)
				{
					throw "Unknown function";
				}
				allHandlers[hname](); // Handle this request with one of the standard handlers. Javascript is SO cool!
			}
		}
		catch (ex) {
			sendError(settings.FAILURE, "Internal Error Occured: " + ex);
		}
	};

	// an error has occurred, send it, close the response
	var sendError = function(errNo, err) {
		resp.writeHead(errNo, "Error", {
			"Content-Type": "application/json"
		});
		resp.write(JSON.stringify({"Error": err})+"\n");  // the \n is just to make it print nicely using curl.  Don't know if this will cause issues with client side or not.
		thisResp.end();
		console.log(err);
	};

	// A database error occurred, send an error, close the response
	var sendDBError = function(err) {
		resp.writeHead(settings.FAILURE, "Database Error", {
			"Content-Type": "application/json"
		});
		resp.write(JSON.stringify({"DB Error": err}) +"\n");
		thisResp.end();
		console.log(err);
	};

	// We have successfully executed the query, return the results of that query
	var sendDBResults = function(results) {
		resp.writeHead(settings.SUCCESS, {
			"Content-Type": "application/json"
		});
		resp.write(JSON.stringify(results) + "\n");
		thisResp.end();
		console.log("Success: " + results);
	};

	// onCompletion is called when a database function has completed. This is where we send the response
	var onCompletion = function(results, err) {
		if (err != null) {
			sendDBError(err);
		}
		else {
			console.log("Completed " + thisReq.method);
			sendDBResults(results);
		}
	};

	// respond to a listing request
	allHandlers.handleGET = function() {
		thisdb.listDocs(parsedReq.query, onCompletion);
	};

	// add a doc to the database,
	// if we are posting, grab chunks from client until the end and build the query.
	allHandlers.handlePOST = function() {
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
				thisdb.addDoc(query, onCompletion);
			}
			catch (ex) {
				sendError(settings.FAILURE, "" + ex);
			}

		});

	};

	// update a person
	allHandlers.handlePUT = function() {
		var reqBody = '';
		req.on("data", function(data) {
			reqBody += data;
			if (reqBody.length > 1e7) { //1MB
				// send 413 - request too large
			}
		});
		req.on("end", function() {
			try { 
				var query = JSON.parse(reqBody); // This is from the video in note 10.  Not sure how this works yet.
				thisdb.updateDoc(query[0], query[1], onCompletion);
			}
			catch (ex) {
				sendError(settings.FAILURE, "" + ex);
			}

		});
	};

	// delete a person
	allHandlers.handleDELETE = function() {
		thisdb.deleteDoc(parsedReq.query, onCompletion);
	};

	allHandlers.handleHEAD = function() {
		sendDBResults(WebInterface);
	};


	return _handler;

};

// onconnect is called after the database connection has been made.  We are now ready to process web requests
var onconnect = function() {
	try {

		http.createServer(function(req, resp) {
			var handler = new HtmlMessageHandler(req, resp); //new htmlMessageHandler();
			handler.handle();
		}).listen(settings.listenPort, process.env.IP, function() {
			console.log("Started listening at: " + settings.listenPort);
		});
	}
	catch (ex) {
		console.log("Exception creating server: " + ex);

	}
};


// all this goodness starts here.
thisdb.init(settings.database, settings.collection, onconnect);

var exitServer = function() {
	try
	{
		console.log("Closing database connection");
  	    thisdb.close();
	}
	finally {
	    process.exit(0);
	}
};

process.on('SIGTERM', exitServer);
process.on('SIGINT', exitServer);
