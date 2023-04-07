import express from 'express';

const app: express.Application = express();
app.use(express.static('public'));
