import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import routes from './src/routes';




const app: express.Application = express();

export const createApp = () => {
  const app: express.Application = express();
  const corsOptions = {
    origin: true,
    credentials: true,
  };
  app.set('trust proxy', 1);
  app.use(express.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(cors(corsOptions));
  app.use(morgan('dev'));

  app.use(routes);

  app.get('/ping', (req: Request, res: Response) => {
    res.send('hello world');
  });

  return app;
};

const PORT = process.env.PORT;
