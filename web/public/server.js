const express = require('express');
const app = express();
console.web = (arg) => {console.log(`[WEB] ${arg}`);};


app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });
app.get('/api/*', (req, res) => res.status(404).json({ code: 404 }));
app.all('*', (req, res) => res.status(200).sendFile(`web/public/index.html`));



const port = process.env.PORT || 80;
app.listen(port, ()=>{
    console.web(`Running server on port: ${port}`);
});