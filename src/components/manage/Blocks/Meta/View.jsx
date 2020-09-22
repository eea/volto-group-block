import React from 'react';
import { RenderBlocks } from '@eeacms/volto-blocks-form/components';

export const MetaBlockView = (props) => {
  const { data } = props;
  return <RenderBlocks {...props} content={data?.data || {}} />;
};
