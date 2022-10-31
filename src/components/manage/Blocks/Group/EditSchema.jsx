import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

const ALIGN_INFO_MAP = {
  narrow_width: [imageFitSVG, 'Narrow width'],
  container_width: [imageFitSVG, 'Container width'],
  wide_width: [imageWideSVG, 'Wide width'],
  full: [imageFullSVG, 'Full width'],
};

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
            fields: ['size'],
          },
        ],
        properties: {
          size: {
            widget: 'style_align',
            title: 'Section size',
            actions: Object.keys(ALIGN_INFO_MAP),
            actionsInfoMap: ALIGN_INFO_MAP,
          },
        },
        required: [],
      },
    },
  },
  required: [],
};

export default Schema;
