const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app  = express();
const port = 3002;

// Set Pug as the templating engine
app.set('view engine', 'pug');
app.set('views', './views');  // The directory where your Pug files will be stored

// For parsing application/json
app.use(bodyParser.json());

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// For parsing mulipart/form-data
app.use(upload.array());

// Allow static files
app.use(express.static('public'));

//app.use(express.static('images'));
//app.use('/static/css', express.static('css'));

app.get('/', function(req, res) {
    res.render('form');
});

app.post('/', function(req, res){
    console.log(req.body);
    res.send("message sent!");
});

app.get('/static', (req, res) => {
    res.render('static', {});
});

app.get('/dynamic_view', (req, res) => {
    res.render('dynamic', {
        name: "Express Notes",
        instructor: "Stiffler", 
        url: "https://expressjs.com/"
    });
});

app.get('/conditional', (req, res) => {
    res.render('conditional', {
        user: {name: "Shayna"}
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});