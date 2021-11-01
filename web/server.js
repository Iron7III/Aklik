const express = require('express');
const app = express();
console.web = (arg) => {console.log(`[WEB] ${arg}`);};

const fs = require('fs');

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });


app.get('/', (req, res)=>{
  //res.sendFile('web/index.html', {root : __dirname + '/views'});
  res.send(fs.readFileSync('web/views/index.html'));
  res.end();
});

const port = process.env.PORT || 80;
app.listen(port, ()=>{
    console.web(`Running server on port: ${port}`);
});