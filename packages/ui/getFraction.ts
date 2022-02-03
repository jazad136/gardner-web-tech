import { Fraction } from "fractional";

export const getFractionFromString = (amount: string): Fraction => {
  amount = amount.trim();
  const fractionIndex = amount.indexOf("/");

  if (fractionIndex < 0) {
    return new Fraction(parseInt(amount), 1);
  }

  const spaceIndex = amount.indexOf(" ");
  if (spaceIndex < 0) {
    const numerator = amount.substring(0, fractionIndex);
    const denominator = amount.substring(fractionIndex + 1);
    return new Fraction(parseInt(numerator), parseInt(denominator));
  }

  const wholeNumber = parseInt(amount.substring(0, spaceIndex));
  const numerator = parseInt(amount.substring(spaceIndex + 1, fractionIndex));
  const denominator = parseInt(amount.substring(fractionIndex + 1));
  const newNumerator = wholeNumber * denominator + numerator;
  return new Fraction(newNumerator, denominator);
};
