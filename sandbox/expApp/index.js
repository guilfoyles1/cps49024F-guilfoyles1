const express = require('express');
const app  = express();
const port = 3001;
const routes = require('./routes.js');

app.use('test', (req, res, next) => {
    console.log("A new request received at " + Date.now());

    // NOtice this function call which indicates that more processing is require for the currect request and is in the 
    //next middleware function route handler.
    next();
});

app.get('/test', (req, res) => {
    res.send('Test');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});