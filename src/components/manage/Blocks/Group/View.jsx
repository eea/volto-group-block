import React from 'react';
import { RenderBlocks } from '@plone/volto/components';

const View = (props) => {
  const { data } = props;
  const metadata = props.metadata || props.properties;
  return (
    <RenderBlocks
      {...props}
      as={data?.as}
      metadata={metadata}
      content={data?.data || {}}
    />
  );
};

export default View;
