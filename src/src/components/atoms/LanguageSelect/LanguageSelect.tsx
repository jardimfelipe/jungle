import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../..';
import { RootState } from '../../../store';
import { setLanguage } from '../../../store/modules/base/actions';
import { getResultsRequest } from '../../../store/modules/results/actions';
import { saveState } from '../../../utils/localStorage';
import { OptionType } from '../Select/Select.types';

const languages = [
  {
    label: 'pt-br',
    value: 'ptBR',
  },
  {
    label: 'en-us',
    value: 'enUS',
  },
  {
    label: 'es-es',
    value: 'esES',
  },
];

const LanguageSelect: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { currentLanguage } = useSelector((state: RootState) => state.base);
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const handleLanguageChange = (option: OptionType | null) => {
    if (!option) return;
    i18n.changeLanguage(option.value);
    dispatch(setLanguage(option.value));
    saveState('user.currentLanguage', option.value);
    isLoggedIn && dispatch(getResultsRequest());
  };

  return (
    <Select
      onChange={handleLanguageChange}
      value={languages.find(({ value }) => value === currentLanguage)}
      placeholder="Selecione"
      options={languages}
    />
  );
};

export default LanguageSelect;
