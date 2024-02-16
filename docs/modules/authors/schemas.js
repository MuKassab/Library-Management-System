export const AddAuthorRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John Doe',
    },
    nationality: {
      type: 'string',
      example: 'Irish',
    },
    biography: {
      type: 'string',
      example: 'He Lived a nice life',
    },
    birthDate: {
      type: 'string',
      format: 'date',
      example: '1960-10-01',
    },
    deathDate: {
      type: 'string',
      format: 'date',
      example: '2010-10-07',
    },
  },
};

export const AddAuthorResponseSchema = {
  type: 'object',
  properties: {
    author: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: '8',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        nationality: {
          type: 'string',
          example: 'Irish',
        },
        biography: {
          type: 'string',
          example: 'He Lived a nice life',
        },
        birthDate: {
          type: 'string',
          format: 'date',
          example: '1960-10-01',
        },
        deathDate: {
          type: 'string',
          format: 'date',
          example: '2010-10-07',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T07:02:51.699Z',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T07:02:51.699Z',
        },
      },
    },
  },
};

export const UpdateAuthorRequestSchema = AddAuthorRequestSchema;

export const UpdateAuthorResponseSchema = AddAuthorResponseSchema;

export const ListAuthorsResponseSchema = {
  type: 'object',
  properties: {
    authors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: '3',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          nationality: {
            type: 'string',
            example: 'Egyptian',
          },
          biography: {
            type: 'string',
            example: 'La La La La',
          },
          birthDate: {
            type: 'string',
            format: 'date',
            example: '2010-10-01',
          },
          deathDate: {
            type: 'string',
            format: 'date',
            example: '2010-10-07',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-02-15T17:13:23.620Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-02-15T17:13:23.620Z',
          },
        },
      },
      example: [
        {
          id: 3,
          name: 'John Doe',
          nationality: 'Egyptian',
          biography: 'La La La La',
          birthDate: '2010-10-01',
          deathDate: '2010-10-07',
          createdAt: '2024-02-15T17:13:23.620Z',
          updatedAt: '2024-02-15T17:13:23.620Z',
        },
      ],
    },
    count: {
      type: 'number',
      example: '6',
    },
  },
};
