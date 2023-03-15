import express, { Request, Response } from 'express';

const app: express.Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`${PORT} port is listening`);
});
