import { PUSH_NOTIFICATION_SERVICES } from '../../../../src/modules/notifications/constants/index.js';

export const AnnouncementCommentSchema = {
  type: 'object',
  required: ['useId', 'content', 'createdAt'],
  properties: {
    userId: {
      type: 'string',
      example: '5e9b2b15342ae462ec351889',
    },
    content: { type: 'string' },
    createdAt: { type: 'number' },
  },
};

export const RefreshTokensSchema = {
  type: 'object',
  required: ['service', 'token'],
  properties: {
    service: {
      type: 'string',
      enum: PUSH_NOTIFICATION_SERVICES,
    },
    token: {
      type: 'string',
    },
  },
};

export const TagSchema = {
  type: 'object',
  required: ['_id', 'name', 'schoolId', 'color'],
  properties: {
    _id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    schoolId: {
      type: 'string',
    },
    color: {
      type: 'string',
    },
  },
};
