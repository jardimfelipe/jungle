import styled from 'styled-components';

import { CardContainer } from '../../atoms/Card/Card.styled';
import { Box } from '../..';
import { StyledButton } from '../../atoms/Button/Button.styled';
import media from 'styled-media-query';
import { UserRoles } from '../../../store';

export const ResumeBox = styled.div<{ role?: UserRoles }>`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  ${CardContainer} {
    flex: 0 0 ${(props) => (props.role === 'admin_jungle' ? '23.5%' : '49.3%')};
  }
  @media (max-width: 1280px) {
    ${CardContainer} {
      flex: 0 0 calc(50% - 7.5px);
    }
  }
  @media (max-width: 860px) {
    ${CardContainer} {
      flex: 0 0 100%;
    }
  }
`;

export const QuestionariesGridContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  .questionary-card,
  ${Box} {
    &:first-child {
      flex: 0 0 100%;
    }
    &:not(:first-child) {
      flex: 0 0 calc(50% - 10px);
    }
    @media (max-width: 890px) {
      &:first-child {
        flex: 0 0 100%;
      }
      &:not(:first-child) {
        flex: 0 0 100%;
      }
    }
  }
`;

export const ModalButton = styled(StyledButton)`
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  border-radius: 0;
`;

export const GestorCard = styled(CardContainer)`
  flex: 0 0 calc(50% - 15px);
  ${media.lessThan('large')`
    flex: 0 0 100%;
  `}
  img {
    position: absolute;
    bottom: 0;
    width: 150px;
    ${media.lessThan('medium')`
    right: 0;
  `}
  }
`;
