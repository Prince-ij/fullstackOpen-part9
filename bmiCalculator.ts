export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 18.5 && bmi < 24.9) {
    return "Normal Weight";
  } else if (bmi > 25 && bmi < 29.9) {
    return "overweight";
  } else {
    return "Obesity, Get diet Fatty";
  }
};

export const parseEmInts = (...args: string[]): number[] => {
  const numbers: number[] = [];
  for (const arg of args) {
    const num = Number(arg);
    if (isNaN(num)) {
      throw new Error(`${arg} is not a valid number`);
    }
    numbers.push(num);
  }
  return numbers;
};

if (require.main === module) {
  try {
    const [height, weight] = parseEmInts(process.argv[2], process.argv[3]);
    console.log(calculateBmi(height, weight));
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`Error: ${err.message}`);
  }
}
