import moment from 'moment';
import { CronJob } from 'cron';

import { UserBorrowedBooksService } from '../service/user-borrowed-books.js';

// Runs once a day at 1 AM
export const validateBorrowedBooksStateJob = new CronJob('0 0 1 * * *', async () => {
  const startTime = moment().format();

  // eslint-disable-next-line no-console
  console.log(`validateBorrowedBooksState - started at ${startTime}`);

  await UserBorrowedBooksService.validateBorrowedBooksState();

  const finishTime = moment().format();

  // eslint-disable-next-line no-console
  console.log(`validateBorrowedBooksState - finished at ${finishTime}`);
});
