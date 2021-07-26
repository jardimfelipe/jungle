import styled from 'styled-components';
import media from 'styled-media-query';

export const ModalContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
  position: relative;
  overflow-y: auto;
  ${media.lessThan('medium')`
    max-width: 350px;
    text-align: center;
  `}
`;

export const CloseButton = styled.button`
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 50px;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  z-index: 100;
`;
