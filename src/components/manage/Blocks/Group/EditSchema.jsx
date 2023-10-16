const Schema = {
  title: 'Section block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'as'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Section friendly name',
      type: 'string',
    },
    as: {
      title: 'HTML5 element',
      description: 'Select HTML5 element to be used for this block',
      type: 'string',
      factory: 'Choice',
      default: 'div',
      choices: [
        ['div', 'div'],
        ['section', 'section'],
        ['article', 'article'],
        ['aside', 'aside'],
        ['details', 'details'],
      ],
    },
  },
  required: [],
};

export default Schema;
