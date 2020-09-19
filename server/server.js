import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './src/routes';

const app = express();
app.use(cors());

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 5000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.options('*', cors());

app.use('/', indexRouter);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
});
