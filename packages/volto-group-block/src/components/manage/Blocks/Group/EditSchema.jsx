import { defineMessages } from 'react-intl';

const messages = defineMessages({
  sectionBlock: {
    id: 'sectionBlock',
    defaultMessage: 'Section block',
  },
  fieldsetDefaultTitle: {
    id: 'fieldsetDefaultTitle',
    defaultMessage: 'Default',
  },
  titlePropertyTitle: {
    id: 'titlePropertyTitle',
    defaultMessage: 'Title',
  },
  titlePropertyDescription: {
    id: 'titlePropertyDescription',
    defaultMessage: 'Section friendly name',
  },
  asPropertyTitle: {
    id: 'asPropertyTitle',
    defaultMessage: 'HTML5 element',
  },
  asPropertyDescription: {
    id: 'asPropertyDescription',
    defaultMessage: 'Select HTML5 element to be used for this block',
  },
});

const Schema = (intl) => ({
  title: intl.formatMessage(messages.sectionBlock),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.fieldsetDefaultTitle),
      fields: ['title', 'as'],
    },
  ],
  properties: {
    title: {
      title: intl.formatMessage(messages.titlePropertyTitle),
      description: intl.formatMessage(messages.titlePropertyDescription),
      type: 'string',
    },
    as: {
      title: intl.formatMessage(messages.asPropertyTitle),
      description: intl.formatMessage(messages.asPropertyDescription),
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
});

export default Schema;
