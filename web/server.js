const express = require('express');
const app = express();
console.web = (arg) => {console.log(`[WEB] ${arg}`);};

const path = require("path");
const expressLayout = require("express-ejs-layouts");
const fs = require("fs");

//to use the static files (styles and that stuff)
app.use(express.static(path.join(__dirname, '/public')));

//To use ejs
app.set("view engine", "ejs");
app.use(expressLayout);

app.set("views", path.join(__dirname, '/views'));

app.use(function (req, res, next) {
  	console.log('Time:', Date.now());
  	next();
});

const ejs = require('ejs');
app.get('/', (req, res)=>{
  	//res.sendFile('web/index.html', {root : __dirname + '/views'});
  	//res.render('/index.ejs');
    console.web(`Running on ${__dirname}`);
  	res.sendFile(__dirname + '/views/layout.ejs');
    /*ejs.renderFile('index.ejs', function(err, str){
       res.send(str);
    });*/
    res.end();
});

const port = process.env.PORT || 80;
app.listen(port, ()=>{
  	console.web(`Running server on port: ${port}`);
});