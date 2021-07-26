import React from 'react';

import {
  Box,
  ProtectionLevel,
  Button,
  Image,
  Typography,
  IconButton,
} from '../../..';
import { UserInfo, UserTag } from '../UserBar.styled';
import { FiChevronRight, FiSettings } from 'react-icons/fi';

import Profile from '../../../../assets/profile.jpg';
import Banner from '../../../../assets/banner-mindgifts.png';

import { UserBarProfileProps } from '../UserBar.types';
import useMobileWidth from '../../../../hooks/useMobileWidth';

const { Text } = Typography;

const UserbarProfiles: React.FC<UserBarProfileProps> = ({
  currentUser,
  onMobileClick,
  onConfigClick,
}) => {
  const isMobile = useMobileWidth();

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
          <IconButton onClick={onConfigClick} icon={<FiSettings />} />
        )}
      </Box>
      <UserInfo>
        <div className="userInfo__points">
          <img src={Profile} alt="profile" />
          <UserTag role={currentUser.role}>
            {currentUser.role === 'gestor' ? currentUser.role : '180pts'}
          </UserTag>
        </div>
        <Text textDecoration="strong" className="userInfo__userName">
          {currentUser.name}
        </Text>
        <Text variant="primary" textDecoration="strong">
          Magalu
        </Text>
      </UserInfo>
      <Box params={{ marginTop: '50px' }}>
        <ProtectionLevel />
      </Box>
      {currentUser.role === 'user' && (
        <Button>
          <Image src={Banner} />
        </Button>
      )}
    </>
  );
};

export default UserbarProfiles;
