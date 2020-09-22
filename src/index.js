import codeSVG from '@plone/volto/icons/show-blocks.svg';
import { MetaBlockEdit, MetaBlockView, MetaBlockSchema } from './components';

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

  const schema = {
    ...MetaBlockSchema,
    properties: {
      ...MetaBlockSchema.properties,
      allowedBlocks: {
        ...MetaBlockSchema.properties.allowedBlocks,
        items: {
          choices: choices,
        },
      },
    },
  };
  config.blocks.blocksConfig.metaBlock = {
    id: 'metaBlock',
    title: 'Meta',
    icon: codeSVG,
    group: 'common',
    view: MetaBlockView,
    edit: MetaBlockEdit,
    schema: schema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};

export default applyConfig;
