import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import BodyComponent from './Body';

const View = (props) => {
  const { data } = props;
  const CustomTag = `${data.as || 'div'}`;
  const customId = data?.title
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z-\s]/gi, '')
    ?.trim()
    ?.replace(/\s+/gi, '-');
  return (
    <CustomTag id={customId}>
      <BodyComponent {...props} />
    </CustomTag>
  );
};

export default withBlockExtensions(View);
