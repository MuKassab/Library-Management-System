import _ from 'lodash';
import httpStatus from 'http-status';

import { Op } from 'sequelize';
import Users from '../model/index.js';
import { CustomAPIError } from '../../common/lib/index.js';
import { EMAIL_IS_USED, USER_HAS_BOOK, USER_NOT_FOUND } from '../../common/constants/index.js';
import { hashData } from '../../common/utils/index.js';
import { USER_TYPE_CUSTOMER } from '../constants/states.js';
import UserBorrowedBooks from '../../user-borrowed-books/model/index.js';
import { BORROWED_BOOK_STATE_OVERDUE, BORROWED_BOOK_STATE_PENDING } from '../../user-borrowed-books/constants/states.js';

const { UNPROCESSABLE_ENTITY, NOT_FOUND } = httpStatus;

export const UsersService = {
  /**
   * Creates new user (customer)
   *
   * @param {Object} args
   * @param {String} [args.name]
   * @param {String} [args.password]
   * @param {String} [args.email]
   *
   * @returns {Promise<{Object}>} {user: {...user}}
   */
  async registerUser({ name, password, email }) {
    // validate no user exits with the same email before
    const userWithSameEmail = await Users.findOne({
      where: { email },
      attributes: ['id'],
    });

    if (!_.isNil(userWithSameEmail)) {
      throw new CustomAPIError({
        message: 'E-mail is already used.',
        status: UNPROCESSABLE_ENTITY,
        errorCode: EMAIL_IS_USED,
      });
    }

    const hashedPassword = await hashData({ data: password });

    let user = await Users.create({
      name,
      password: hashedPassword,
      email,
      userType: USER_TYPE_CUSTOMER,
    });

    // remove user password from response
    user = user.toJSON();
    delete user.password;

    return user;
  },

  /**
   * Updates user data given his id
   *
   * @param {Object} args
   * @param {Number} [args.userId]
   * @param {String} [args.name]
   * @param {String} [args.password]
   * @param {String} [args.email]
   *
   * @returns {Promise<{Object}>} {user: {...user}}
   */
  async updateUser({ userId, name, password, email }) {
    const userExists = await Users.findByPk(userId, { attributes: ['id'] });

    if (_.isNil(userExists)) {
      throw new CustomAPIError({
        message: 'User does not exist.',
        status: NOT_FOUND,
        errorCode: USER_NOT_FOUND,
      });
    }

    const updateObject = {};

    if (!_.isNil(name)) {
      updateObject.name = name;
    }

    if (!_.isNil(email)) {
      // validate no user exits with the same email before
      const userWithSameEmail = await Users.findOne({
        where: { email },
        attributes: ['id'],
      });

      if (!_.isNil(userWithSameEmail)) {
        throw new CustomAPIError({
          message: 'E-mail is already used.',
          status: UNPROCESSABLE_ENTITY,
          errorCode: EMAIL_IS_USED,
        });
      }

      updateObject.email = email;
    }

    if (!_.isNil(password)) {
      const hashedPassword = await hashData({ data: password });
      updateObject.password = hashedPassword;
    }

    // update user based on the given params
    await Users.update(updateObject, { where: { id: userId } });

    // This promise must be done after the update to get the updated user row
    const user = await Users.findByPk(userId, { attributes: { exclude: ['password'] } });

    return user.toJSON();
  },

  /**
   * Deletes a user from the system given his id
   *
   * @param {Object} args
   * @param {Number} [args.userId]
   *
   * @returns {Promise<>}
   */
  async deleteUser({ userId }) {
    const userExists = await Users.findByPk(userId, { attributes: ['id'] });

    if (_.isNil(userExists)) {
      throw new CustomAPIError({
        message: 'User does not exist.',
        status: NOT_FOUND,
        errorCode: USER_NOT_FOUND,
      });
    }

    const userHasBorrowedBooks = await UserBorrowedBooks.findOne({
      where: {
        userId,
        borrowState: {
          [Op.or]: [BORROWED_BOOK_STATE_PENDING, BORROWED_BOOK_STATE_OVERDUE],
        },
      },
    });

    if (!_.isNil(userHasBorrowedBooks)) {
      throw new CustomAPIError({
        message: 'User has non returned books',
        status: UNPROCESSABLE_ENTITY,
        errorCode: USER_HAS_BOOK,
      });
    }

    await Users.destroy({ where: { id: userId } });
  },

  /**
   * Gets a user by his id
   *
   * @param {Object} args
   * @param {Number} [args.userId]
   *
   * @returns {Promise<{Object}>} {user: {...userData}}
   */
  async getUser({ userId }) {
    const user = await Users.findByPk(userId, { attributes: { exclude: ['password'] } });

    if (_.isNil(user)) {
      throw new CustomAPIError({
        message: 'User does not exist.',
        status: NOT_FOUND,
        errorCode: USER_NOT_FOUND,
      });
    }

    return user;
  },

  /**
   * Lists users in the system
   *
   * @param {Object} args
   * @param {Number} [args.limit]
   * @param {Number} [args.skip]
   *
   * @returns {Promise<{[Object]}>} {users: [{...userData}], count}
   */
  async listUsers({ limit, skip }) {
    const { count, rows: users } = await Users.findAndCountAll({
      limit,
      offset: skip,
      attributes: { exclude: ['password'] },
      // sort the users by id as there db does not select data in the same order every time
      order: [['id', 'ASC']],
    });


    return { users, count };
  },
};
