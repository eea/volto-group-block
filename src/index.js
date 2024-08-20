import { getBlocks } from '@plone/volto/helpers';
import {
  GroupBlockEdit,
  GroupBlockView,
  GroupBlockLayout,
  GroupBlockDefaultBody,
} from './components';
import codeSVG from '@plone/volto/icons/row.svg';

const applyConfig = (config) => {
  const choices = Object.keys(config.blocks.blocksConfig)
    .map((key) => {
      if (config.blocks.blocksConfig[key]?.restricted) {
        return false;
      } else {
        const title = config.blocks.blocksConfig[key]?.title || key;
        return [key, title];
      }
    })
    .filter((val) => !!val);

  choices.push(['group', 'Group']);

  const schema = {
    ...GroupBlockLayout,
    properties: {
      ...GroupBlockLayout.properties,
      allowedBlocks: {
        ...GroupBlockLayout.properties.allowedBlocks,
        items: {
          choices: choices,
        },
      },
    },
  };

  if (!config.blocks.blocksConfig.empty) {
    config.blocks.blocksConfig.empty = {
      id: 'empty',
      edit: () => {
        return null;
      },
      view: () => {
        return null;
      },
    };
  }

  config.blocks.blocksConfig.group = {
    id: 'group',
    title: 'Section (Group)',
    icon: codeSVG,
    group: 'common',
    view: GroupBlockView,
    edit: GroupBlockEdit,
    schema: schema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    variations: [
      {
        id: 'default',
        isDefault: true,
        title: 'Default',
        template: GroupBlockDefaultBody,
      },
    ],
    tocEntries: (block = {}, tocData) => {
      // integration with volto-block-toc
      const headlines = tocData.levels || ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      let entries = [];
      const blocks = getBlocks(block?.data || {});
      blocks.forEach((block) => {
        const { value, plaintext } = block[1];
        const type = value?.[0]?.type;
        if (headlines.includes(type)) {
          entries.push([parseInt(type.slice(1)), plaintext, block[0]]);
        }
      });
      return entries;
    },
    countTextIn: ['slate', 'description'], //id of the block whose text should be counted
  };

  return config;
};

export default applyConfig;
