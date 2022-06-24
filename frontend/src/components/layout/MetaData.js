import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`Global Aircond - ${title}`}</title>
    </Helmet>
  );
};

export default MetaData;
