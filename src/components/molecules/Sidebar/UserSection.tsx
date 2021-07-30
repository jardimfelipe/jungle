import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Typography } from '../..';
import { MenuItem, MenuList, UserSectionContainer } from './Sidebar.styled';
import { BiCog, BiLogOut } from 'react-icons/bi';
import Profile from '../../../assets/profile.jpg';

import { removeState } from '../../../utils/localStorage';
import { logout } from '../../../store/modules/login/actions';
import { useDispatch } from 'react-redux';

const { Text } = Typography;

const UserSection: React.FC = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeState('auth.token');
    dispatch(logout());
  };
  return (
    <UserSectionContainer>
      <Box params={{ display: 'flex', paddingLeft: '32px', gap: '10px' }}>
        <Avatar image={Profile} />
        <Box
          params={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Text className="user-name">User Name</Text>
          <Text className="user-role">Jungle Master</Text>
        </Box>
      </Box>
      <MenuList>
        <MenuItem>
          <Link to="/">
            <BiCog /> Configurações
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/" onClick={handleLogout}>
            <BiLogOut /> Deslogar
          </Link>
        </MenuItem>
      </MenuList>
    </UserSectionContainer>
  );
};

export default UserSection;
