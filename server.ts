import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';

const startServer = async () => {
  const app: express.Application = createApp();
  const PORT: any = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`${PORT} port is listening`);
  });
};
