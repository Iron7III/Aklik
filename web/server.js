const express = require('express');
const app = express();

console.web = (arg) => {console.log(`[WEB] ${arg}`);};

/*
const port = process.env.PORT || 80;
app.listen(port, ()=>{
    console.web(`Running server on port: ${port}`);
});
*/

const PORT = process.env.PORT;
var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    //console.web(`server:${server}`);
    //console.log(server);
    console.web(`server is listening at http://${host}:${port}`);
});

app.use((req, res, next)=>{
    console.web('Web requested');
    next();
});

/*app.get('/', (req, res)=>{
    console.web('User entering to the main web!');
    res.send('Hello, world!');
});*/
// heroku local web