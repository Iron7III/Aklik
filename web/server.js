const express = require('express');
const app = express();
console.web = (arg) => {console.log(`[WEB] ${arg}`);};

const path = require("path");
const expressLayout = require("express-ejs-layouts");


//to use the static files (styles and that stuff)
app.use(express.static(path.join(__dirname, '/public')));

//To use ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));
app.use(expressLayout);

app.use(function (req, res, next) {
  	console.log('Time:', Date.now());
  	next();
});

app.get('/', (req, res)=>{
    res.render('index.ejs');
    res.end();
});

const port = process.env.PORT || 80;
app.listen(port, ()=>{
  	console.web(`Running server on port: ${port}`);
});