import UsersDocs from './users/index.js';
import AuthorsDocs from './authors/index.js';
import BooksDocs from './books/index.js';

export default {
  ...UsersDocs,
  ...AuthorsDocs,
  ...BooksDocs,
};
