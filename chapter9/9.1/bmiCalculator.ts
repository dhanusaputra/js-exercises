export const calculateBMI = (h: number, w: number) : string => {
  switch(true) {
  case w/Math.pow(h*0.01, 2) < 15:
    return 'Very severely underweight';
  case w/Math.pow(h*0.01, 2) < 16:
    return 'Severely underweight';
  case w/Math.pow(h*0.01, 2) < 18.5:
    return 'Underweight';
  case w/Math.pow(h*0.01, 2) < 25:
    return 'Normal (healthy weight)';
  case w/Math.pow(h*0.01, 2) < 30:
    return 'Overweight';
  case w/Math.pow(h*0.01, 2) < 35:
    return 'Obese Class I (Moderately obese)';
  case w/Math.pow(h*0.01, 2) < 40:
    return 'Obese Class II (Severely obese)';
  case w/Math.pow(h*0.01, 2) >= 40:
    return 'Obese Class III (Very severely obese)';
  default:
    throw new Error('invalid argument');
  }
};

// const h: number = Number(process.argv[2])
// const w: number = Number(process.argv[3])

// try {
//   console.log(calculateBMI(h, w))
// } catch (e) {
//   console.log('Something went wrong, error message: ', e.message);
// }
