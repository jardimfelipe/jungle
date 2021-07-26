import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Typography } from '../..';
import { MenuItem, MenuList } from './Sidebar.styled';
import { BiCog, BiLogOut } from 'react-icons/bi';
import Profile from '../../../assets/profile.jpg';

const { Text } = Typography;

const UserSection: React.FC = () => {
  return (
    <UserSection>
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
          <Link to="/">
            <BiLogOut /> Deslogar
          </Link>
        </MenuItem>
      </MenuList>
    </UserSection>
  );
};

export default UserSection;
