import React from 'react';

import { Transition } from 'react-transition-group';
import { Box } from '../..';

import { Overlay } from '../../atoms/Overlay/Overlay.styled';
import { CloseButton, ModalContainer } from './Modal.styled';
import { GrClose } from 'react-icons/gr';

import { ModalProps } from './Modal.types';

// import { Container } from './styles';

const overlayStyle = {
  transition: `opacity 400ms ease-in-out`,
};

const modalStyle = {
  transition: `200ms ease-in-out`,
};

const overlayTransition = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width,
  height,
}) => {
  const modalTransition = {
    entering: { width: 0, height: 0 },
    entered: { width: `${width || '766'}px`, height: `${height || '400'}px` },
    exiting: { width: 0, height: 0 },
    exited: { width: 0, height: 0 },
  };
  return (
    <Transition in={isOpen} timeout={100} unmountOnExit>
      {(state) => (
        <Overlay
          style={{
            ...overlayStyle,
            ...overlayTransition[state as keyof typeof overlayTransition],
          }}
        >
          <ModalContainer
            style={{
              ...modalStyle,
              ...modalTransition[state as keyof typeof modalTransition],
            }}
          >
            <Box
              params={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '15px 10px',
              }}
            >
              <CloseButton onClick={onClose}>
                <GrClose size="18" />
              </CloseButton>
            </Box>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </Transition>
  );
};

export default Modal;
