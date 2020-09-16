const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 5000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', (req, res) => {
    res.render('index', { msg: 'Hello From Anas Traders.' });
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
});
