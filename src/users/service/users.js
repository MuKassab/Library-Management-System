import _ from 'lodash';
import httpStatus from 'http-status';

import Users from '../model/index.js';
import { CustomAPIError } from '../../common/lib/index.js';
import { EMAIL_IS_USED, USER_NOT_FOUND } from '../../common/constants/index.js';
import { hashData } from '../../common/utils/index.js';
import { USER_TYPE_CUSTOMER } from '../constants/states.js';

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
    // validate no user exits with the same email before
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
    // validate no user exits with the same email before
    const userExists = await Users.findByPk(userId, { attributes: ['id'] });

    if (_.isNil(userExists)) {
      throw new CustomAPIError({
        message: 'User does not exist.',
        status: NOT_FOUND,
        errorCode: USER_NOT_FOUND,
      });
    }

    // TODO: Prevent User deletion if he still has books borrowed
    // TODO: if user doesn't have books but still have history then the history
    // TODO: should be removed (VIA on delete cascade index)
    await Users.destroy({ where: { id: userId } });
  },
};
