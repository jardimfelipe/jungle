import { CollaboratorEdit } from "../../../store/modules/collaborator/types";

export type TableMenuProps = {
  onClose: () => void;
  isOpen: boolean;
  usr?: CollaboratorEdit;
};
