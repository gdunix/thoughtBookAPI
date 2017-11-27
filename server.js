var mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    bodyParser = require('body-parser')
    config = require('./config'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    jwt = require('jsonwebtoken');

mongoose.Promise = global.Promise;
mongoose.connect(config.db)
    .then(() =>  console.log('connection successful'))
    .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (config.allowCrossOrigin) {
        res.header("Access-Control-Allow-Origin", '*');
    }
    res.header("Access-Control-Request-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

var routes = require('./routes/index');

app.use('/api', routes);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

app.listen(port);


console.log('ThoughtBook RESTful API server started on: ' + port);

module.exports = app;