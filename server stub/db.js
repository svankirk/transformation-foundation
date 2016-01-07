// Importable interface for db init and functions.
// all functions are available through db interface

exports.db = {
    init : initFunc,
    insertPerson : insertPerson,
};

var mongoose = require('mongoose');

var initFunc = (function() {
    var db = mongoose.connection;
    mongoose.connect('mongodb://localhost/data');
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      // yay!
    });    
});

var insertPerson = function(person) {
    
};
