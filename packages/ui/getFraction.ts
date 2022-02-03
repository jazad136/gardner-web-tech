import { Fraction } from "fractional";

export const getFractionFromString = (amount: string): Fraction => {
  const fractionIndex = amount.indexOf("/");
  const numerator = amount.substring(0, fractionIndex);
  const denominator = amount.substring(fractionIndex + 1);
  return new Fraction(parseInt(numerator), parseInt(denominator));
};
