/**
 *
 * @param {String} firstDate
 * @param {String} secondDate
 *
 * @returns {Number} 1 => fDate > sDate || 0 => fDate == sDate || -1 => fDate < sDate
 */
export const compareDates = (firstDate, secondDate) => {
  const firstDateTime = new Date(firstDate).getTime();
  const secondDateTime = new Date(secondDate).getTime();

  if (firstDateTime > secondDateTime) { return 1; }

  if (firstDateTime === secondDateTime) { return 0; }

  return -1; // second date is greater
};
