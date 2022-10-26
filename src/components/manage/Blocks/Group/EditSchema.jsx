import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const VALUE_MAP = [
  ['normal', imageFitSVG],
  ['wide', imageWideSVG],
  ['full', imageFullSVG],
  ['', clearSVG],
];

const Schema = {
  title: 'Section block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'as'],
    },
    {
      id: 'styling',
      title: 'Styling',
      fields: ['styles'],
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
    styles: {
      widget: 'object',
      title: 'Styling',
      schema: {
        fieldsets: [
          {
            id: 'default',
            title: 'Default',
            fields: ['align'],
          },
        ],
        properties: {
          align: {
            widget: 'style_text_align',
            title: 'Section size',
            actions: VALUE_MAP,
          },
        },
        required: [],
      },
    },
  },
  required: [],
};

export default Schema;
