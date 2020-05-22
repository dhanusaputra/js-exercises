import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const w = Number(req.query.weight);
    const h = Number(req.query.height);
    res.send({
      weight: w,
      height: h,
      bmi: calculateBMI(h,w)
    });
  } catch (e) {
    res.status(400).send({error: "malformatted parameters"});
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  res.send(calculateExercises(body.daily_exercises, body.target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
