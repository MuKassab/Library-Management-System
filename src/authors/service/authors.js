import _ from 'lodash';
import httpStatus from 'http-status';

import { Op } from 'sequelize';
import Authors from '../model/index.js';
import { CustomAPIError } from '../../common/lib/index.js';
import {
  AUTHOR_EXISTS,
  AUTHOR_HAS_BOOKS,
  AUTHOR_NOT_FOUND,
  INVALID_BIRTH_DATE,
  INVALID_DEATH_DATE,
} from '../../common/constants/index.js';
import { compareDates } from '../../common/utils/index.js';
import Books from '../../books/model/index.js';

const { UNPROCESSABLE_ENTITY, NOT_FOUND } = httpStatus;

export const AuthorsService = {
  /**
   * Add author
   *
   * @param {Object} args
   * @param {String} [args.name]
   * @param {String} [args.nationality]
   * @param {String} [args.biography]
   * @param {Date} [args.birthDate]
   * @param {Date} [args.deathDate]
   *
   * @returns {Promise<{Object}>} author
   */
  async addAuthor({ name, nationality, biography, birthDate, deathDate }) {
    // validate no user exits with the same email before
    const authorWithSameName = await Authors.findOne({
      where: { name },
      attributes: ['id'],
    });

    if (!_.isNil(authorWithSameName)) {
      throw new CustomAPIError({
        message: 'Author already exists',
        status: UNPROCESSABLE_ENTITY,
        errorCode: AUTHOR_EXISTS,
      });
    }

    const author = await Authors.create({
      name,
      nationality,
      biography,
      birthDate,
      deathDate,
    });

    return author;
  },

  /**
   * Updates author's data given his id
   *
   * @param {Object} args
   * @param {Number} [args.authorId]
   * @param {String} [args.name]
   * @param {String} [args.nationality]
   * @param {String} [args.biography]
   * @param {String} [args.birthDate]
   * @param {String} [args.deathDate]
   *
   * @returns {Promise<{Object}>} author
   */
  async updateAuthor({
    authorId, name, nationality, biography, birthDate, deathDate,
  }) {
    const author = await Authors.findByPk(authorId, { attributes: ['id', 'birthDate', 'deathDate'] });

    if (_.isNil(author)) {
      throw new CustomAPIError({
        message: 'Author does not exist.',
        status: NOT_FOUND,
        errorCode: AUTHOR_NOT_FOUND,
      });
    }

    const updateObject = {};

    if (!_.isNil(name)) {
      const authorWithSameName = await Authors.findOne({
        where: {
          name,
          id: { [Op.ne]: authorId },
        },
        attributes: ['id'],
      });

      if (!_.isNil(authorWithSameName)) {
        throw new CustomAPIError({
          message: 'Author already exists',
          status: UNPROCESSABLE_ENTITY,
          errorCode: AUTHOR_EXISTS,
        });
      }

      updateObject.name = name;
    }

    if (!_.isNil(nationality)) {
      updateObject.nationality = nationality;
    }

    if (!_.isNil(biography)) {
      updateObject.biography = biography;
    }

    if (!_.isNil(birthDate)) {
      const deathDateToCompareWith = deathDate || author.deathDate;

      if (compareDates(deathDateToCompareWith, birthDate) !== 1) {
        throw new CustomAPIError({
          message: 'Birth date MUST be less than death date',
          status: UNPROCESSABLE_ENTITY,
          errorCode: INVALID_BIRTH_DATE,
          meta: { birthDate, deathDate: deathDateToCompareWith },
        });
      }

      updateObject.birthDate = birthDate;
    }

    if (!_.isNil(deathDate)) {
      const birthDateToCompareWith = birthDate || author.birthDate;

      if (compareDates(deathDate, birthDateToCompareWith) !== 1) {
        throw new CustomAPIError({
          message: 'Death date MUST be greater than birth date',
          status: UNPROCESSABLE_ENTITY,
          errorCode: INVALID_DEATH_DATE,
          meta: { birthDate: birthDateToCompareWith, deathDate },
        });
      }

      updateObject.deathDate = deathDate;
    }

    // update author based on the given params
    await Authors.update(updateObject, { where: { id: authorId } });

    // This promise must be done after the update to get the updated user row
    const updatedAuthor = await Authors.findByPk(authorId);

    return updatedAuthor;
  },

  /**
   * Deletes an author from the system given his id
   *
   * @param {Object} args
   * @param {Number} [args.authorId]
   *
   * @returns {Promise<>}
   */
  async deleteAuthor({ authorId }) {
    const authorExists = await Authors.findByPk(authorId, { attributes: ['id'] });

    if (_.isNil(authorExists)) {
      throw new CustomAPIError({
        message: 'Author does not exist.',
        status: NOT_FOUND,
        errorCode: AUTHOR_NOT_FOUND,
      });
    }

    const authorHasBooks = await Books.findOne({
      where: {
        authorId,
      },
    });

    if (!_.isNil(authorHasBooks)) {
      throw new CustomAPIError({
        message: 'Author is related to books',
        status: UNPROCESSABLE_ENTITY,
        errorCode: AUTHOR_HAS_BOOKS,
      });
    }

    await Authors.destroy({ where: { id: authorId } });
  },

  /**
   * Lists authors in the system
   *
   * @param {Object} args
   * @param {Number} [args.limit]
   * @param {Number} [args.skip]
   *
   * @returns {Promise<{[Object]}>} {authors: [{...authorData}], count}
   */
  async listAuthors({ limit, skip }) {
    const { count, rows: authors } = await Authors.findAndCountAll({
      limit,
      offset: skip,
      // sort the authors by id as there db does not select data in the same order every time
      order: [['id', 'ASC']],
    });


    return { authors, count };
  },
};
