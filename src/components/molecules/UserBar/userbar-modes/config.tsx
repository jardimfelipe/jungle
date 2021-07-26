import React from 'react';

import { Box, Button, Typography } from '../../..';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { UserBarButton, UserInfo } from '../UserBar.styled';

import Profile from '../../../../assets/profile.jpg';
import { UserBarConfigProps } from '../UserBar.types';

const { Text } = Typography;

const UserBarConfig: React.FC<UserBarConfigProps> = ({
  currentUser,
  onBackButtonClick,
  onPasswordButtonClick,
}) => {
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
          Magalu
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
            Alterar dados pessoais <BsArrowRight />
          </UserBarButton>
          <UserBarButton onClick={onPasswordButtonClick}>
            Alterar senha <BsArrowRight />
          </UserBarButton>
        </Box>
      </UserInfo>
    </>
  );
};

export default UserBarConfig;
