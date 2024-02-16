import { config } from './common/config/index.js';
import { sequelize } from './common/database/index.js';
import { cronjobs } from './jobs.js';
import { initHttpServer } from './server.js';

// Start server only when database is working as expected
sequelize.authenticate().then(async () => {
  // enable trgm(trigrams) extension to allow trgm indexes for text search
  await sequelize.query('CREATE EXTENSION IF NOT EXISTS pg_trgm;');

  // create missing tables in database if any
  await sequelize.sync();

  // start cronjob
  cronjobs.forEach(cronjob => cronjob.start());

  // Initialize and run server
  const server = initHttpServer();
  server.listen(config.PORT);
}).catch(err => {
  // eslint-disable-next-line no-console
  console.log('Failed to authenticate connection with database', err);
  throw err;
});
