import React, { useEffect } from 'react';

import { Box, ProtectionLevel, Image, Typography, IconButton } from '../../..';
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

const { Text } = Typography;

const UserbarProfiles: React.FC<UserBarProfileProps> = ({
  currentUser,
  onMobileClick,
  onConfigClick,
}) => {
  const isMobile = useMobileWidth();
  const dispatch = useDispatch();
  const { results } = useSelector((state: RootState) => state.results);
  const { companies } = useSelector(({ companies }: RootState) => companies);

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
          <IconButton onClick={onConfigClick} icon={<FiSettings />} />
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
