import { ModalProps } from '../Modal/Modal.types';

export interface ConfirmationModalProps extends ModalProps {
  onFeedbackClick: (e: boolean) => void;
}
