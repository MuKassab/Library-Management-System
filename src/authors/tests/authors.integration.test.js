import request from 'supertest';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import httpStatus from 'http-status';
import app from '../../app.js';
import { sequelize } from '../../common/database/db.js';
import { AUTHOR_EXISTS, AUTHOR_HAS_BOOKS } from '../../common/constants/index.js';
import Authors from '../model/index.js';
import Books from '../../books/model/index.js';

const { CREATED, UNPROCESSABLE_ENTITY, OK, NO_CONTENT } = httpStatus;

describe('Authors Endpoint Integration Tests', () => {
  // Empty Data Before Tests
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  describe('Add Author - POST v0/authors', () => {
    const author = {};

    beforeEach(async () => {
      author.name = faker.lorem.words(2);
      author.nationality = faker.lorem.word();
      author.biography = faker.lorem.paragraph();
      author.birthDate = moment().subtract(40, 'years').format('YYYY-MM-DD');
    });

    const addAuthor = async ({ authorData = author } = {}) => {
      const { status, body } = await request(app)
        .post('/api/v0/authors')
        .send(authorData);

      return { status, body };
    };

    test('It add author successfully', async () => {
      const { status, body } = await addAuthor();

      expect(status).toBe(CREATED);

      expect(body.author.name).toBe(author.name);
      expect(body.author.nationality).toBe(author.nationality);
      expect(body.author.biography).toBe(author.biography);
      expect(body.author.birthDate).toBe(author.birthDate);
      expect(body.author.deathDate).toBeNull();
    });

    test('It fails to add author if name already exists', async () => {
      await addAuthor();
      const { status, body } = await addAuthor();

      expect(status).toBe(UNPROCESSABLE_ENTITY);

      expect(body.errorCode).toBe(AUTHOR_EXISTS);
    });
  });

  describe('Update Author - PATCH v0/authors/:id', () => {
    const authorData = {};
    let author;

    beforeEach(async () => {
      authorData.name = faker.lorem.words(2);
      authorData.nationality = faker.lorem.word();
      authorData.biography = faker.lorem.paragraph();
      authorData.birthDate = moment().subtract(40, 'years').format('YYYY-MM-DD');
      authorData.deathDate = moment().format('YYYY-MM-DD');

      author = await Authors.create(authorData);
    });

    const updateAuthor = async ({ authorId = author.id, updateData = {} } = {}) => {
      const { status, body } = await request(app)
        .patch(`/api/v0/authors/${authorId}`)
        .send(updateData);

      return { status, body };
    };

    test('It updates author successfully', async () => {
      const updateData = {
        name: faker.lorem.words(2),
        deathDate: moment().subtract(5, 'years').format('YYYY-MM-DD'),
      };

      const { status, body } = await updateAuthor({ updateData });

      expect(status).toBe(OK);

      expect(body.author.id).toBe(author.id);
      expect(body.author.name).toBe(updateData.name);
      expect(body.author.deathDate).toBe(updateData.deathDate);
    });

    test('It fails to update author if name exists', async () => {
      const authorDataCopy = { ...authorData };
      authorDataCopy.name = faker.lorem.word();
      await Authors.create(authorDataCopy);

      const updateData = {
        name: authorDataCopy.name,
      };

      const { status, body } = await updateAuthor({ updateData });

      expect(status).toBe(UNPROCESSABLE_ENTITY);

      expect(body.errorCode).toBe(AUTHOR_EXISTS);
    });
  });

  describe('Delete Author - DELETE v0/authors/:id', () => {
    let author;

    beforeEach(async () => {
      const authorData = {
        name: faker.lorem.words(2),
        nationality: faker.lorem.word(),
        biography: faker.lorem.paragraph(),
        birthDate: moment().subtract(40, 'years').format('YYYY-MM-DD'),
        deathDate: moment().format('YYYY-MM-DD'),
      };


      author = await Authors.create(authorData);
    });

    const deleteAuthor = async ({ authorId = author.id } = {}) => {
      const { status, body } = await request(app)
        .delete(`/api/v0/authors/${authorId}`);

      return { status, body };
    };

    test('It deletes author successfully', async () => {
      const { status, body } = await deleteAuthor();

      expect(status).toBe(NO_CONTENT);

      expect(body).toBeEmpty();
    });

    test('It fails to delete author if books are related to him', async () => {
      await Books.create({
        title: 'dummyTitle',
        authorId: author.id,
        ISBN: '978-1-4028-9462-6',
        totalQuantity: '15',
        shelfLocation: 'AB 21 C',
        availableQuantity: 15,
        borrowedCount: 0,
      });

      const { status, body } = await deleteAuthor();

      expect(status).toBe(UNPROCESSABLE_ENTITY);

      expect(body.errorCode).toBe(AUTHOR_HAS_BOOKS);
    });
  });
});
