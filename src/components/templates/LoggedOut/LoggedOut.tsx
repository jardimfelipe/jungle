import React from 'react';

import { LoggedOutImage, LoggedOutRow } from './LoggedOut.styled';
import { Col } from 'react-flexbox-grid';

const LoggedOutTemplate: React.FC = ({ children }) => {
  return (
    <LoggedOutRow>
      <Col className="loggedout-col" xs={12} md={7}>
        <LoggedOutImage></LoggedOutImage>
      </Col>
      <Col xs>{children}</Col>
    </LoggedOutRow>
  );
};

export default LoggedOutTemplate;
