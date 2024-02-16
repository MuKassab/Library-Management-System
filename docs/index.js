import endpointDefinitions from './modules/index.js';

import {
  USERS_TAG,
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
  ],

  paths: endpointDefinitions,

  // components: {
  //   securitySchemes: {
  //     jwtAuth: {
  //       type: 'apiKey',
  //       in: 'header',
  //       name: 'Authorization',
  //     },
  //   },
  // },

  // security: [
  //   {
  //     jwtAuth: [],
  //   },
  // ],

};

export default index;
