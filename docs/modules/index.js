import UsersDocs from './users/index.js';
import AuthorsDocs from './authors/index.js';
import BooksDocs from './books/index.js';
import UserBorrowedBooksDocs from './user-borrowed-books/index.js';

export default {
  ...UsersDocs,
  ...AuthorsDocs,
  ...BooksDocs,
  ...UserBorrowedBooksDocs,
};
