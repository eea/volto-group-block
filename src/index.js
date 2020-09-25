import codeSVG from '@plone/volto/icons/show-blocks.svg';
import { GroupBlockEdit, GroupBlockView, GroupBlockSchema } from './components';

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
    ...GroupBlockSchema,
    properties: {
      ...GroupBlockSchema.properties,
      allowedBlocks: {
        ...GroupBlockSchema.properties.allowedBlocks,
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
  };

  return config;
};

export default applyConfig;
