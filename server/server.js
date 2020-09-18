import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import AgentService from './src/db/AgentService';

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
app.get('/agents', async (req, res) => {
    const agentService = new AgentService();

    try {
        const agents = await agentService.getAll();
        res.json(agents);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error.');
    }
});

app.all('*', (req, res) => {
    res.render('index', { msg: 'Hello From Anas Traders.' });
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
});
