import React from 'react';

import { Box, Button, Typography } from '../../..';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { UserBarButton, UserInfo } from '../UserBar.styled';

import Profile from '../../../../assets/profile.jpg';
import { UserBarConfigProps } from '../UserBar.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const UserBarConfig: React.FC<UserBarConfigProps> = ({
  currentUser,
  onBackButtonClick,
  onPasswordButtonClick,
}) => {
  const { t } = useTranslation();
  const { companies } = useSelector(({ companies }: RootState) => companies);
  return (
    <>
      <Box
        params={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Button onClick={onBackButtonClick}>
          <BsArrowLeft />
          Voltar
        </Button>
      </Box>
      <UserInfo>
        <div className="userInfo__points">
          <img src={Profile} alt="profile" />
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
        <Box
          params={{
            marginTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: '100%',
          }}
        >
          <UserBarButton>
            {t('button.changePersonalData')} <BsArrowRight />
          </UserBarButton>
          <UserBarButton onClick={onPasswordButtonClick}>
            {t('button.changePassword')} <BsArrowRight />
          </UserBarButton>
        </Box>
      </UserInfo>
    </>
  );
};

export default UserBarConfig;
