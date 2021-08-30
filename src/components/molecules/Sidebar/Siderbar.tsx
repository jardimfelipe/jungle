import React from 'react';

import { useHistory, Link } from 'react-router-dom';

import { SidebarContainer, MenuList, MenuItem } from './Sidebar.styled';
import JungleLogo from '../../../assets/jungle.png';
import { Box, Tag, IconButton } from '../..';
import { BiLogOut } from 'react-icons/bi';
import { FiChevronLeft } from 'react-icons/fi';
import UserSection from './UserSection';

import SpecialistBanner from './SpecialistBanner';
import useMobileWidth from '../../../hooks/useMobileWidth';

import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarState } from '../../../store/modules/base/actions';
import { removeState } from '../../../utils/localStorage';
import { logout } from '../../../store/modules/login/actions';
import { routes } from '../../../app/Routes';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isSidebarOpen } = useSelector(({ base }: RootState) => base);
  const isMobile = useMobileWidth();
  const { currentUser } = useSelector(({ login }: RootState) => login);

  const checkActiveRoute = (path: string) => {
    if (path !== '/') return !!history.location.pathname.match(path);
    return history.location.pathname === path;
  };

  const handleClick = () => {
    dispatch(setSidebarState(false));
  };
  const handleLogout = () => {
    removeState('auth.token');
    dispatch(logout());
  };
  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <MenuList>
        {isMobile ? (
          <Box params={{ alignSelf: 'flex-start' }}>
            <IconButton onClick={handleClick} icon={<FiChevronLeft />} />
          </Box>
        ) : null}
        <Box className="jungle-logo" params={{ padding: '0 25px' }}>
          <img src={JungleLogo} alt="Jungle" />
        </Box>
        {routes[currentUser.role as keyof typeof routes].map(
          ({ name, icon, isSoon, path, translationName = '' }) =>
            name ? (
              <MenuItem
                isActive={checkActiveRoute(path)}
                isSoon={!!isSoon}
                key={path}
              >
                <Link to={path}>
                  {icon} {t(`menu.${translationName}`)}{' '}
                  {isSoon && <Tag>em breve</Tag>}
                </Link>
              </MenuItem>
            ) : null
        )}
      </MenuList>
      {currentUser.role === 'admin_jungle' ? (
        <UserSection />
      ) : (
        <>
          <SpecialistBanner />
          <MenuList style={{ marginTop: '0' }}>
            <MenuItem>
              <Link to="/" onClick={handleLogout}>
                <BiLogOut /> {t('menu.logout')}
              </Link>
            </MenuItem>
          </MenuList>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
