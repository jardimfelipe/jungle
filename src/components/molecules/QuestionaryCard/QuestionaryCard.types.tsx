import { Questionary } from '../../../store/modules/questionaries/types';

export type QuestionaryCardProps = {
  questionary: Questionary;
  onClick: (questionary: Questionary) => void;
};
