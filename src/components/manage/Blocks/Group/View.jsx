import React from 'react';
import { RenderBlocks } from '@eeacms/volto-blocks-form/components';

const View = (props) => {
  const { data } = props;
  return <RenderBlocks as={data?.as} {...props} content={data?.data || {}} />;
};

export default View;
