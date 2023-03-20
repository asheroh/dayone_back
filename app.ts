import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from './src/routes';

dotenv.config();

const app: express.Application = express();

export const createApp = () => {
  const app: express.Application = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

  app.use(routes);

  return app;
};

// health check
app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world');
});

const PORT = process.env.PORT;
