import bcrypt from 'bcryptjs';

import { config } from '../config/index.js';

/**
 * Hashes given plain data w/o pepper from env with the passed salt factor
 *
 * @param {Object} args
 * @param {String} [args.data]
 * @param {Boolean} [args.usePepper=true]
 * @param {Number} [args.saltFactor=10] defines the cost factor in hash (higher = slower and more secure)
 *
 * @returns {Promise<{String}>} hashed data
 */
export const hashData = async ({ data, usePepper = true, saltFactor = 10 }) => {
  let dataCopy = data;

  if (usePepper) {
    dataCopy = data + config.HASH_PEPPER;
  }

  const salt = await bcrypt.genSalt(saltFactor);
  const hashedData = await bcrypt.hash(dataCopy, salt);

  return hashedData;
};

/**
 * Compares given plain data w/o pepper with the hashed data
 *
 * @param {Object} args
 * @param {String} [args.data]
 * @param {String} [args.hashedData]
 * @param {Boolean} [args.usePepper=true]
 *
 * @returns {Promise<{Boolean}>} is plain equal to hashed data
 */
export const compareHashedData = async ({ data, hashedData, usePepper = true }) => {
  let dataCopy = data;

  if (usePepper) {
    dataCopy = data + config.HASH_PEPPER;
  }

  const isEqual = await bcrypt.compare(dataCopy, hashedData);

  return isEqual;
};
