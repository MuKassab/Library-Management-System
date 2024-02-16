export const StartDateQueryParameter = {
  in: 'query',
  name: 'startDate',
  schema: {
    type: 'String',
    format: 'date',
  },
  description: 'Start date to export data (default is one month ago)',
};

export const EndDateQueryParameter = {
  in: 'query',
  name: 'endDate',
  schema: {
    type: 'String',
    format: 'date',
  },
  description: 'end date to export data (default is now)',
};
