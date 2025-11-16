import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    res.json({ bmi: calculateBmi(height, weight) });
  } else {
    res.status(400).json({ error: "values must be numbers" });
  }
});

app.post("/exercises", (req, res) => {
  const exercises = req.body.daily_exercises;
  const target = req.body.target;

  const result = calculateExercises(exercises, target);

  for (const exercise of exercises) {
    if (isNaN(exercise)) {
      return res
        .status(400)
        .json({ error: "exercise array must all be numbers" });
    }
  }

  if (Array.isArray(exercises) && !isNaN(target)) {
    return res.json(result);
  }

  return res.status(400).json({ error: "wrong input data" });
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT} port`);
});
