var messageHandler = function(msg)
{
    var thisMsg =msg;

    var printmsg = function() {
        console.log( thisMsg );
    };
    
    var sendError = function() {
        console.log("Error");
        
    };
    
    return {
        printmsg:printmsg,
        sendError:sendError,
    };
};

var hiMsg = new messageHandler("hi");
var loMsg = new messageHandler("low");
hiMsg.printmsg();
loMsg.printmsg();