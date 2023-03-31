// install dependcies
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import songsRoutes from './routes/songsRoutes';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

const PORT = process.env.PORT || 5050;

app.use('/songs', songsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(` App listening on port ${PORT} `);
});
