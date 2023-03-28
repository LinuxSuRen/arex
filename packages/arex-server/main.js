import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { preTest } from './postman/preTest.js';
import { proxy } from './postman/proxy.js';
import { test } from './postman/test.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/vi/health', (req, res) => {
  res.send('365ms');
});
app.post('/test123', (req, res) => {
  res.send({
    body: req.body,
  });
});

app.post('/proxy', proxy);
app.post('/proxy/pretest', preTest);
app.post('/proxy/test', test);

app.listen(16888, () => {
  console.log('hi');
});
