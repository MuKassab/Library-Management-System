import _ from 'lodash';
import httpStatus from 'http-status';

import Users from '../model/index.js';
import { CustomAPIError } from '../../common/lib/index.js';
import { EMAIL_IS_USED } from '../../common/constants/error-codes.js';
import { hashData } from '../../common/utils/index.js';
import { USER_TYPE_CUSTOMER } from '../constants/states.js';

const { UNPROCESSABLE_ENTITY } = httpStatus;

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
};
