interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (args: Array<number>, target: number) : Result => {
  const average: number = args.reduce((acc, cur) => acc + cur, 0) / args.length;
  let rating: number, ratingDescription: string;

  switch (true) {
  case Math.round(average) == target:
    rating = 2;
    ratingDescription = 'not bad';
    break;
  case Math.round(average) < target:
    rating = 1;
    ratingDescription = 'bad';
    break;
  case Math.round(average) > target:
    rating = 3;
    ratingDescription = 'good job';
    break;
  }

  return {
    periodLength: args.length,
    trainingDays: args.reduce((acc, cur) => cur > 0 ? acc + 1 : acc, 0),
    success: rating >= 2,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

// console.log(calculateExercises(process.argv.slice(2).map(Number)));
