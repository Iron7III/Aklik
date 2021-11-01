const express = require('express');
const app = express();
console.web = (arg) => {console.log(`[WEB] ${arg}`);};


app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

const port = process.env.PORT || 80;
app.listen(port, ()=>{
    console.web(`Running server on port: ${port}`);
});