import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
dotenv.config();

import { createApp } from './app';
import dayoneDataSource from './src/models/dayone.data-source';

const startServer = async () => {
  const app: express.Application = createApp();
  const PORT: any = process.env.PORT;

  await dayoneDataSource
    .initialize()
    .then(() => {
      console.log('DAY ONE DB has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  app.listen(PORT, () => {
    console.log(`${PORT} port is listening`);
  });
};

startServer();
