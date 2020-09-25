import React from 'react';
import { RenderBlocks } from '@plone/volto/components';

const View = (props) => {
  const { data } = props;
  return <RenderBlocks {...props} content={data?.data || {}} />;
};

export default View;
