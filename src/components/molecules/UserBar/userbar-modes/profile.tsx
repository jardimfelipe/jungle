import React, { useEffect } from 'react';

import {
  Box,
  ProtectionLevel,
  Image,
  Typography,
  IconButton,
  Select,
} from '../../..';
import { MindGiftsLink, UserInfo, UserTag } from '../UserBar.styled';
import { FiChevronRight, FiSettings } from 'react-icons/fi';

import Profile from '../../../../assets/profile.jpg';
import Banner from '../../../../assets/banner-mindgifts.png';

import { UserBarProfileProps } from '../UserBar.types';
import useMobileWidth from '../../../../hooks/useMobileWidth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getResultsRequest } from '../../../../store/modules/results/actions';
import { getCompaniesRequest } from '../../../../store/modules/companies/actions';
import { useTranslation } from 'react-i18next';
import { OptionType } from '../../../atoms/Select/Select.types';
import { setLanguage } from '../../../../store/modules/base/actions';

const { Text } = Typography;

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

const UserbarProfiles: React.FC<UserBarProfileProps> = ({
  currentUser,
  onMobileClick,
  onConfigClick,
}) => {
  const isMobile = useMobileWidth();
  const dispatch = useDispatch();
  const { results } = useSelector((state: RootState) => state.results);
  const { currentLanguage } = useSelector((state: RootState) => state.base);
  const { companies } = useSelector(({ companies }: RootState) => companies);
  const { i18n } = useTranslation();

  const handleLanguageChange = (option: OptionType | null) => {
    if (!option) return;
    i18n.changeLanguage(option.value);
    dispatch(setLanguage(option.value));
  };

  useEffect(() => {
    !results.statistics.length && dispatch(getResultsRequest(currentUser.role));
  }, [dispatch, results, currentUser]);

  useEffect(() => {
    dispatch(getCompaniesRequest());
  }, [dispatch]);

  return (
    <>
      <Box
        params={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        {isMobile ? (
          <IconButton onClick={onMobileClick} icon={<FiChevronRight />} />
        ) : (
          <Box
            params={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <IconButton onClick={onConfigClick} icon={<FiSettings />} />
            <Box params={{ flex: '0 0 100px' }}>
              <Select
                onChange={handleLanguageChange}
                value={languages.find(({ value }) => value === currentLanguage)}
                placeholder="Selecione"
                options={languages}
              />
            </Box>
          </Box>
        )}
      </Box>
      <UserInfo>
        <div className="userInfo__points">
          <img src={Profile} alt="profile" />
          {currentUser.role === 'gestor' && (
            <UserTag role={currentUser.role}> {currentUser.role} </UserTag>
          )}
        </div>
        <Text textDecoration="strong" className="userInfo__userName">
          {currentUser.name}
        </Text>
        <Text variant="primary" textDecoration="strong">
          {
            companies.find((company) => company.id === currentUser.company)
              ?.name
          }
        </Text>
      </UserInfo>
      <Box params={{ marginTop: '50px' }}>
        <ProtectionLevel statistics={results.statistics} />
      </Box>
      {currentUser.role === 'user' && (
        <MindGiftsLink
          target="_blank"
          href="https://www.junglexp.com/mindgifts-clientes-dashboard"
        >
          <Image src={Banner} />
        </MindGiftsLink>
      )}
    </>
  );
};

export default UserbarProfiles;
