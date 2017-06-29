var cors = require("cors");
var body = require("body-parser");
var expr = require("express");

var app = module.exports = expr();

app.use(cors());
app.use(body.json());
app.use(expr.static(__dirname + "/views"));
app.use("/datevalue/:dateVal",function(req,res,next){
   var dateVal = req.params.dateVal;
   var preferences = {
       year: 'numeric',
       month: 'long',
       day: 'numeric'
   }
   if(isNaN(dateVal)){
       var naturalDate = new Date(dateVal);
       naturalDate = naturalDate.toLocaleDateString("en-us",preferences);
       var unixDate = new Date(dateVal).getTime()/1000;
       if(naturalDate == "Invalid Date"){
           naturalDate = null;
           unixDate = null;
       }
   }
   else{
       var naturalDate = new Date(dateVal * 1000);
       naturalDate = naturalDate.toLocaleDateString("en-us",preferences);
       var unixDate = dateVal; 
   }
   res.json({
       unix: unixDate,
       natural: naturalDate
   })
})
app.listen("3000");


