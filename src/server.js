import http from 'http';
import _ from 'lodash';

import app from './app.js';
import { config } from './common/config/index.js';

let httpServerSingleton = null;

/**
 * Initialize http server using express() this provides access to the server itself as express hides it
 * The returned instance can be used with sockets connection as well but must be stored to constant first
 *
 * @returns {http.Server}
 */
export const getHTTPServer = () => {
  if (!_.isNil(httpServerSingleton)) {
    return httpServerSingleton;
  }

  // Create and start server
  httpServerSingleton = http.createServer(app);

  // Log if server fails.
  // eslint-disable-next-line no-console
  httpServerSingleton.on('error', err => console.error('Error on starting server', err));

  // Log when server starts listening or when it fails to listen.
  httpServerSingleton.on('listening', err => {
    if (_.isNil(err)) {
      // eslint-disable-next-line no-console
      console.info(`Server started on port ${config.PORT}`);
    } else {
      // eslint-disable-next-line no-console
      console.error('Error on trying to listen on port', err);
    }
  });

  return httpServerSingleton;
};
