import { ResumeProps } from '../../../store/modules/results/types';

export type ResultLineProps = {
  results: ResumeProps;
  type: string;
  hasAnalysis?: boolean;
};

export const LineTexts = {
  Amabilidade: {
    left: 'Amigável',
    right: 'Desafiador',
  },
  Ansiedade: {
    left: 'Amigável',
    right: 'Desafiador',
  },
  neuroticidade: {
    left: 'Estabilidade Emocional',
    right: 'Reatividade ao Estresse',
  },
  contato: {
    left: 'Extroversão',
    right: 'Introversão',
  },
  abertura: {
    left: 'Imaginativo',
    right: 'Prático',
  },
};
