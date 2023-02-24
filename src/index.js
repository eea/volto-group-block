import codeSVG from '@plone/volto/icons/row.svg';
import {
  GroupBlockEdit,
  GroupBlockView,
  GroupBlockLayout,
  GroupBlockDefaultBody,
} from './components';

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
    sidebarTab: 0,
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
  };

  return config;
};

export default applyConfig;
