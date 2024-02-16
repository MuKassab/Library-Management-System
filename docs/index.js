import endpointDefinitions from './modules/index.js';

import {
  AUTHORS_TAG,
  BOOKS_TAG,
  USERS_TAG,
  USER_BORROWED_BOOKS_TAG,
} from './tags.js';

const index = {
  openapi: '3.0.0',

  info: {
    description: 'Documentation of REST API endpoints',
    version: '1.0.0',
    title: 'Library Management System',
  },

  servers: [{
    url: '/api',
  }],

  tags: [
    {
      name: USERS_TAG,
      description: 'Users Endpoints',
    },
    {
      name: AUTHORS_TAG,
      description: 'Authors Endpoints',
    },
    {
      name: BOOKS_TAG,
      description: 'Books Endpoints',
    },
    {
      name: USER_BORROWED_BOOKS_TAG,
      description: 'User Borrowed Books Endpoints',
    },
  ],

  paths: endpointDefinitions,

  components: {
    securitySchemes: {
      jwtAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
  },

  security: [
    {
      jwtAuth: [],
    },
  ],
};

export default index;
