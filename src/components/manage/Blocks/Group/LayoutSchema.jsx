const Schema = {
  title: 'Section (Group) settings',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'title',
        'placeholder',
        'instructions',
        'allowedBlocks',
        'as',
        'maxChars',
        'maxCharsOverflowPercent',
        'ignoreSpaces',
        'readOnlySettings',
        'disableInnerButtons',
        'required',
        'fixed',
        'fixedLayout',
        'disableNewBlocks',
        'readOnly',
      ],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Section friendly name',
      type: 'string',
    },
    allowedBlocks: {
      title: 'Allowed blocks',
      description: 'Allow only the following blocks types',
      type: 'array',
      items: {
        choices: [],
      },
    },
    placeholder: {
      title: 'Helper text',
      description:
        'A short hint that describes the expected value within this block',
      type: 'string',
    },
    instructions: {
      title: 'Instructions',
      description: 'Detailed expected value within this block',
      type: 'string',
      widget: 'richtext',
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
    maxChars: {
      title: 'Maximum Characters',
      description: 'The maximum number of characters.',
      type: 'integer',
      factory: 'Integer',
    },
    maxCharsOverflowPercent: {
      title: 'Maximum Characters Overflow Percent',
      description:
        'The percentage of characters that can overflow the maximum characters limit before showing a warning: 0-100',
      type: 'integer',
      factory: 'Integer',
    },
    ignoreSpaces: {
      title: 'Ignore spaces',
      description: 'Ignore spaces while calculating maximum characters',
      type: 'boolean',
    },
    required: {
      title: 'Required',
      description: "Don't allow deletion of this block",
      type: 'boolean',
    },
    fixed: {
      title: 'Fixed position',
      description: 'Disable drag & drop on this block',
      type: 'boolean',
    },
    fixedLayout: {
      title: 'Fixed layout',
      description:
        'Fixed layout, New blocks created by Editor within this block will be ignored',
      type: 'boolean',
    },
    disableNewBlocks: {
      title: 'Disable new blocks',
      description: 'Disable creation of new blocks after this block',
      type: 'boolean',
    },
    readOnly: {
      title: 'Read-only',
      description: 'Disable editing on this block',
      type: 'boolean',
    },
    readOnlySettings: {
      title: 'Read-only settings',
      description: 'Disable editing on section block settings',
      type: 'boolean',
    },
    disableInnerButtons: {
      title: 'Disable inner buttons',
      description: 'Hide all block related buttons within this block',
      type: 'boolean',
    },
  },
  required: [],
};

export default Schema;
