import _ from 'lodash';
import httpStatus from 'http-status';

import { Op } from 'sequelize';
import Books from '../model/index.js';
import { CustomAPIError } from '../../common/lib/index.js';
import {
  AUTHOR_NOT_FOUND,
  BOOK_EXISTS,
  BOOK_NOT_FOUND,
} from '../../common/constants/index.js';
import Authors from '../../authors/model/index.js';

const { UNPROCESSABLE_ENTITY, NOT_FOUND } = httpStatus;

export const BooksService = {
  /**
   * Add book
   *
   * @param {Object} args
   * @param {String} [args.title]
   * @param {Number} [args.authorId]
   * @param {String} [args.ISBN]
   * @param {Number} [args.totalQuantity]
   * @param {String} [args.shelfLocation]
   *
   * @returns {Promise<{Object}>} book
   */
  async addBook({ title, authorId, ISBN, totalQuantity, shelfLocation }) {
    // validate no user exits with the same email before
    const bookWithSameTitle = await Books.findOne({
      where: { title },
      attributes: ['id'],
    });

    if (!_.isNil(bookWithSameTitle)) {
      throw new CustomAPIError({
        message: 'Book already exists',
        status: UNPROCESSABLE_ENTITY,
        errorCode: BOOK_EXISTS,
      });
    }

    // validate author's existence
    const author = await Authors.findOne({
      where: { id: authorId },
      attributes: ['id'],
    });

    if (_.isNil(author)) {
      throw new CustomAPIError({
        message: 'Author not found',
        status: NOT_FOUND,
        errorCode: AUTHOR_NOT_FOUND,
      });
    }

    const book = await Books.create({
      title,
      authorId,
      ISBN,
      totalQuantity,
      // whenever a book is first add the availableQuantity must equal to the totalQuantity
      availableQuantity: totalQuantity,
      shelfLocation,
    });

    return book.toJSON();
  },

  /**
   * Update book details
   *
   * @param {Object} args
   * @param {Number} [args.bookId]
   * @param {String} [args.title]
   * @param {Number} [args.authorId]
   * @param {String} [args.ISBN]
   * @param {Number} [args.totalQuantity]
   * @param {String} [args.shelfLocation]
   *
   * @returns {Promise<{Object}>} book
   */
  async updateBook({
    bookId, title, authorId, ISBN, totalQuantity, shelfLocation,
  }) {
    const book = await Books.findByPk(
      bookId,
      { attributes: ['id', 'totalQuantity', 'availableQuantity'] },
    );

    if (_.isNil(book)) {
      throw new CustomAPIError({
        message: 'Book does not exist.',
        status: NOT_FOUND,
        errorCode: BOOK_NOT_FOUND,
      });
    }

    const updateObject = {};

    if (!_.isNil(title)) {
      const bookWithSameTitle = await Books.findOne({
        where: {
          title,
          id: { [Op.ne]: bookId },
        },
        attributes: ['id'],
      });

      if (!_.isNil(bookWithSameTitle)) {
        throw new CustomAPIError({
          message: 'Book already exists',
          status: UNPROCESSABLE_ENTITY,
          errorCode: BOOK_EXISTS,
        });
      }

      updateObject.title = title;
    }

    if (!_.isNil(authorId)) {
      // validate author's existence
      const author = await Authors.findOne({
        where: { id: authorId },
        attributes: ['id'],
      });

      if (_.isNil(author)) {
        throw new CustomAPIError({
          message: 'Author not found',
          status: NOT_FOUND,
          errorCode: AUTHOR_NOT_FOUND,
        });
      }

      updateObject.authorId = authorId;
    }

    if (!_.isNil(ISBN)) {
      updateObject.ISBN = ISBN;
    }

    if (!_.isNil(totalQuantity)) {
      // FIXME: this should be fixed to validate that the number is at least greater than the number of books borrowed
      updateObject.totalQuantity = totalQuantity;
      updateObject.availableQuantity = totalQuantity;
    }

    if (!_.isNil(shelfLocation)) {
      updateObject.shelfLocation = shelfLocation;
    }

    // update author based on the given params
    await Books.update(updateObject, { where: { id: bookId } });

    // This promise must be done after the update to get the updated user row
    const updatedAuthor = await Books.findByPk(bookId);

    return updatedAuthor.toJSON();
  },

  /**
   * Deletes an book from the system given his id
   *
   * @param {Object} args
   * @param {Number} [args.bookId]
   *
   * @returns {Promise<>}
   */
  async deleteBook({ bookId }) {
    // validate no user exits with the same email before
    const bookExists = await Books.findByPk(bookId, { attributes: ['id'] });

    if (_.isNil(bookExists)) {
      throw new CustomAPIError({
        message: 'Book does not exist.',
        status: NOT_FOUND,
        errorCode: BOOK_NOT_FOUND,
      });
    }

    // TODO: Prevent book deletion if it's borrowed
    await Books.destroy({ where: { id: bookId } });
  },

  /**
   * Lists books in the system
   *
   * @param {Object} args
   * @param {Number} [args.limit]
   * @param {Number} [args.skip]
   * @param {String} [args.fuzzySearch]
   *
   * @returns {Promise<{[Object]}>} {books: [{...bookData}], count}
   */
  async listBooks({ limit, skip, fuzzySearch }) {
    let queryObject = {};

    if (!_.isNil(fuzzySearch)) {
      queryObject = {
        [Op.or]: [
          // Fuzzy search on the name title and ISBN in the books table
          { title: { [Op.iLike]: `%${fuzzySearch}%` } },
          { ISBN: { [Op.iLike]: `%${fuzzySearch}%` } },
          // Fuzzy search on the name field in the authors table
          {
            '$Author.name$': { [Op.iLike]: `%${fuzzySearch}%` },
          },
        ],
      };
    }

    const { count, rows: authors } = await Books.findAndCountAll({
      where: queryObject,
      limit,
      offset: skip,
      // sort the authors by id as there db does not select data in the same order every time
      order: [['id', 'ASC']],
      // Include authors names (required for fuzzy search + better response)
      include: [{
        model: Authors,
        attributes: ['name'],
      }],
    });


    return { authors, count };
  },
};
