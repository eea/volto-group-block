import codeSVG from '@plone/volto/icons/show-blocks.svg';
import { EditMetaBlock, ViewMetaBlock } from './components';

const applyConfig = (config) => {
  config.blocks.blocksConfig.metaBlock = {
    id: 'metaBlock',
    title: 'Meta',
    icon: codeSVG,
    group: 'common',
    view: ViewMetaBlock,
    edit: EditMetaBlock,
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
