var express = require("express");
var studentRoute = require("./router.js")
var app = express();
var bodyParser = require("body-parser")
app.use(bodyParser.json());


app.use("/students",studentRoute);


app.listen(4500,()=>{
    console.log("server started")
})



