import sequelize from './db.js';
import { config } from './common/config/index.js';
import { initHttpServer } from './server.js';

// Start server only when database is working as expected
sequelize.authenticate().then(async () => {
  // create missing tables in database if any
  await sequelize.sync();

  // Initialize and run server
  const server = initHttpServer();
  server.listen(config.PORT);
}).catch(err => {
  // eslint-disable-next-line no-console
  console.log('Failed to authenticate connection with database', err);
  throw err;
});
