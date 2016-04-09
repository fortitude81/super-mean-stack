var cool = require('cool-ascii-faces');
var express = require('express');
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var session = require("express-session");
var path = require('path');
var router = require('server/router');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('fulloffunwithcodingjs'));
app.use(session({ secret: 'fulloffunwithcodingjs' }));

// Used for production build
app.use(express.static(path.join(__dirname, 'public')));

router(app);

app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});
