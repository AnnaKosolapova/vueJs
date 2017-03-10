var fs = require("fs");
var express = require("express");
var router = express.Router();

var app = express();
var path = __dirname + "/";
var logFile = fs.createWriteStream('./server.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode

// router.use(function (req,res,next) {
//     console.log(new Date().toLocaleString() + " " + req.method + " " + req.path);
//     logFile.write(new Date().toISOString() + " " + req.method + " " + req.path + "\n");
//     next();
// });

app.use("/",router);

app.use('/build', express.static('build'))

app.use("*",function(req,res){
    res.sendFile(path + "index.html");
});

app.listen(3009,function(){
    console.log("Live at Port 3009");
});