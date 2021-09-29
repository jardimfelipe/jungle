import styled from 'styled-components';

import QuestionaryImage from '../../../assets/questionary-image.png';
import { Button, Label, Typography } from '../..';

import { Box } from '../..';
import media from 'styled-media-query';

const { Text } = Typography;

export const QuestionariesGridContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  .questionary-card,
  ${Box} {
    &:first-child {
      flex: 0 0 66%;
    }
    &:not(:first-child) {
      flex: 0 0 calc(33% - 10px);
    }
    @media (max-width: 1280px) {
      &:first-child {
        flex: 0 0 100%;
      }
      &:not(:first-child) {
        flex: 0 0 calc(50% - 10px);
      }
    }
  }
  .questionary-card {
    @media (max-width: 768px) {
      &:first-child {
        flex: 0 0 100%;
      }
      &:not(:first-child) {
        flex: 0 0 100%;
      }
    }
  }
`;

export const ImageContainer = styled.div`
  background-image: url(${QuestionaryImage});
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
`;

export const QuestionaryWrapper = styled.div`
  flex-basis: 0 1 60%;
  ${media.lessThan('huge')`
    flex: 0 1 100%;
  `}
`;

export const ImageWrapper = styled.div`
  flex: auto;
  ${media.lessThan('huge')`
    display: none;
  `}
`;

export const QuestionaryContainer = styled.div`
  flex: auto;
  background-color: #ffffff;
  padding: 32px;
  position: relative;
  height: 100vh;
  ${media.lessThan('medium')`
    padding: 0 25px 150px 25px;
  `}
`;

export const Divider = styled.hr`
  margin: 32px 0;
`;

export const QuestionText = styled(Text)`
  font-size: 18px;
  line-height: 33px;
`;

export const QuestionButton = styled(Button)`
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  border-radius: 0;
  height: 69px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  ${Label} {
    flex: 0 0 50%;
    margin-top: 20px;
  }
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition: opacity 500ms, transform 500ms;
  background-color: #ffffff;
`;

export const QuestionaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 25px 0;
`;

export const QuestionOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  max-height: 250px;
`;

export const OptionBox = styled.div`
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`;
