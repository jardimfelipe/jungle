import { LoginState } from "../../../store";

export type UserBarProfileProps = {
  currentUser: LoginState['currentUser']
  onMobileClick: () => void
  onConfigClick: () => void
}

export type UserBarConfigProps = {
  currentUser: LoginState['currentUser']
  onBackButtonClick: () => void
  onPasswordButtonClick: () => void
}

export type PasswordModalProps = {
  isModalOpen: boolean;
  onCancel: () => void;
}