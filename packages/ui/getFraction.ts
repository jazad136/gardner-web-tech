import { Fraction } from "fractional";

export const getFractionFromString = (amount: string): Fraction => {
  const fractionIndex = amount.indexOf("/");

  if (fractionIndex < 0) {
    return new Fraction(parseInt(amount), 1);
  }

  const numerator = amount.substring(0, fractionIndex);
  const denominator = amount.substring(fractionIndex + 1);
  return new Fraction(parseInt(numerator), parseInt(denominator));
};
