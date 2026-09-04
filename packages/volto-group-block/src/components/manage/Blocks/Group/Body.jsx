import React from 'react';
import PropTypes from 'prop-types';
import { GroupBlockDefaultBody } from '@eeacms/volto-group-block/components';

const Body = (props) => {
  const { variation } = props;

  const BodyComponent = variation?.template || GroupBlockDefaultBody;

  return <BodyComponent {...props} />;
};

Body.propTypes = {
  variation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Body;
