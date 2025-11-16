import { parseEmInts } from "./bmiCalculator";

interface ExerciseResult {
  numberOfDays: number;
  trainingDays: number;
  targetValue: number;
  averageTime: number;
  targetReached: Boolean;
  rating: 1 | 2 | 3;
  explanation: string;
}

export const calculateExercises = (
  exercises: number[],
  target: number
): ExerciseResult => {
  const numberOfDays = exercises.length;
  const trainingDays = exercises.filter((e) => e !== 0).length;
  const targetValue = target;
  const averageTime = exercises.reduce((a, b) => a + b) / trainingDays;

  return {
    numberOfDays,
    trainingDays,
    targetValue,
    averageTime,
    targetReached: averageTime >= target,
    rating: averageTime < targetValue ? 1 : 2,
    explanation: "you try bro, no matter the result",
  };
};

if (require.main === module) {
  const args = process.argv.slice(2);
  const target = args[args.length - 1];
  const exercises = args.slice(0, -1);

  try {
    const parsedExercises = parseEmInts(...exercises);
    const parsedTarget = parseEmInts(target)[0];

    console.log(calculateExercises(parsedExercises, parsedTarget));
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}
