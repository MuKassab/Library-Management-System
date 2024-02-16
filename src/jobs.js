import { validateBorrowedBooksStateJob } from './user-borrowed-books/cron/index.js';

export const cronjobs = [
  validateBorrowedBooksStateJob,
];
