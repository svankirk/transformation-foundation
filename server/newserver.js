var express=require("express");
var app=express();
app.post("/jsform", function(req,res) {
   console.log(req);
   res.send("response",200);
});
app.listen(process.env.PORT, function(){
    console.log("server is running on port " + process.env.PORT);
});
