import React from 'react';

import { IconButton, Image } from '../..';
import { RiMenu2Fill } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import JungleLogo from '../../../assets/jungle.png';
import { TopBarContainer } from './MobileTopBar.styled';

import { useDispatch } from 'react-redux';
import {
  setSidebarState,
  setUserbarState,
} from '../../../store/modules/base/actions';

const MobileTopBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSidebarMenuClick = () => {
    dispatch(setSidebarState(true));
  };

  const handleUserbarMenuClick = () => {
    dispatch(setUserbarState(true));
  };
  return (
    <TopBarContainer>
      <IconButton onClick={handleSidebarMenuClick} icon={<RiMenu2Fill />} />
      <Image src={JungleLogo} />
      <IconButton onClick={handleUserbarMenuClick} icon={<AiOutlineUser />} />
    </TopBarContainer>
  );
};

export default MobileTopBar;
