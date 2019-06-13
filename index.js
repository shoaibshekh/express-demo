const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const joi = require('joi');
const express = require('express');
// const logger = require('./logger');
// const auth = require('./auth');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');




if (app.get('env') === 'devlopment') {
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled')
}

dbDebugger('connected to database');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app:${app.get('env')}`);

// app.get('env');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(logger);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/',home);
// app.use(morgan('tiny'));
// app.use(auth);


console.log('App name:' + config.get('name'));
// console.log('mail server'+ config.get('mail.host'));
// console.log('mail password:'+ config.get("mail['password']"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening', port));


