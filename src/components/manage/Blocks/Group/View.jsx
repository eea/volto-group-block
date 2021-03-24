import React from 'react';
import { RenderBlocks } from '@plone/volto/components';

const View = (props) => {
  const { data } = props;
  const metadata = props.metadata || props.properties;
  const CustomTag = `${data.as || 'div'}`;
  const customId = data?.title
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z-\s]/gi, '')
    ?.trim()
    ?.replace(/\s+/gi, '-');
  return (
    <CustomTag id={customId}>
      <RenderBlocks {...props} metadata={metadata} content={data?.data || {}} />
    </CustomTag>
  );
};

export default View;
