import http from 'http';
import _ from 'lodash';

import app from './app.js';
import { config } from './common/config/index.js';

// Create and run start server
const server = http.createServer(app);
server.listen(config.PORT);

// Log if server fails.
// eslint-disable-next-line no-console
server.on('error', err => console.error('Error on starting server', err));

// Log when server starts listening or when it fails to listen.
server.on('listening', err => {
  if (_.isNil(err)) {
    // eslint-disable-next-line no-console
    console.info(`Server started on port ${config.PORT}`);
  } else {
    // eslint-disable-next-line no-console
    console.error('Error on trying to listen on port', err);
  }
});
