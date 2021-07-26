import styled from 'styled-components';

import { Col } from 'react-flexbox-grid';
import { Typography } from '../..';

const { Title } = Typography;

export const CardTitle = styled(Title)`
  line-height: 0;
  margin-bottom: 1.5em;
`;

export const CardImage = styled(Col)`
  img {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 200px;
    @media (max-width: 1080px) {
      width: 250px;
    }
    @media (max-width: 768px) {
      width: 160px;
    }
  }
`;
