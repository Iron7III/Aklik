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


app.get('/', (req, res)=>{
  	//res.sendFile('web/index.html', {root : __dirname + '/views'});
  	//res.render('/index.ejs');
  	res.send('layout.ejs');
    res.end();
});

const port = process.env.PORT || 80;
app.listen(port, ()=>{
  	console.web(`Running server on port: ${port}`);
});