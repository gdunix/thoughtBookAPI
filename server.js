import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import config from './config';
import router from './routes/index';

let app = express(),
    port = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (config.allowCrossOrigin || true) {
        res.header("Access-Control-Allow-Origin", '*');
    }
    
    res.header("Access-Control-Allow-Origin", 'https://cerulean-brown-bear-fez.cyclic.app', 'https://http://localhost:9000', 'https://movieapp-a9f70.web.app/');
    res.header("Access-Control-Request-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use('/api', router);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);


console.log('ThoughtBook RESTful API server started on: ' + port);
export default app;