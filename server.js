import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import jwt from 'jsonwebtoken';
import config from './config';
import router from './routes/index';

let app = express(),
    port = process.env.PORT || 4000;

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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.use('/api', router);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

app.listen(port);


console.log('ThoughtBook RESTful API server started on: ' + port);

export default app;