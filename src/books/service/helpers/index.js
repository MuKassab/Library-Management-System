import { ISBN_REGEX } from '../../../common/constants/index.js';

export const isValidISBN = ISBN => {
  // Custom validation to check the last digit of ISBN-13
  if (!ISBN_REGEX.test(ISBN)) {
    return false;
  }

  /**
   * To Validate ISBN get the sum of multiplying first 12 digits by 1 or 3 (alternating)
   * Calculate 10 - (sum % 10) === the 13th digit
   */
  const numbers = ISBN.replace(/-/g, '').split('').map(Number);
  const lastDigit = numbers.pop();
  const sum = numbers.reduce((acc, num, index) => acc + (index % 2 === 0 ? num : num * 3), 0);

  return (10 - (sum % 10)) === lastDigit;
};
