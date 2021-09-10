import React, { useEffect, useState } from 'react';

import { UserBarContainer } from './UserBar.styled';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setUserbarState } from '../../../store/modules/base/actions';
import UserbarProfiles from './userbar-modes/profile';
import UserBarConfig from './userbar-modes/config';
import { SwitchTransition, Transition } from 'react-transition-group';


import { useHistory } from 'react-router-dom';
import PasswordModal from './PasswordModal';

const barStyle = {
  transition: `200ms ease-in-out`,
};

const barTransition = {
  entering: { transform: 'translateX(-20%)', opacity: '0' },
  entered: { transform: 'translateX(0)', opacity: '1' },
  exiting: { opacity: '0', transform: 'translateX(-20%)' },
  exited: { opacity: '0', transform: 'translateX(-20%)' },
};

const Userbar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isUserbarOpen } = useSelector(({ base }: RootState) => base);
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const [userBarType, setUserBarType] = useState<'userProfile' | 'config'>(
    'userProfile'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMobileClick = () => {
    dispatch(setUserbarState(false));
  };

  const handleConfigClick = () => {
    setUserBarType('config');
  };

  const handleBackButtonClick = () => {
    setUserBarType('userProfile');
  };

  const handleCancelButton = () => {
    setIsModalOpen(false);
  };

  const handlePasswordButtonClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (history.location.pathname === '/') {
      dispatch(setUserbarState(true));
    } else {
      dispatch(setUserbarState(false));
    }
  }, [history, dispatch]);

  return (
    <>

   


      <UserBarContainer isUserbarOpen={isUserbarOpen}>
        <SwitchTransition>
          <Transition key={userBarType} timeout={100} unmountOnExit>
            {(state) =>
              userBarType === 'userProfile' ? (
                <div
                  style={{
                    ...barStyle,
                    ...barTransition[state as keyof typeof barTransition],
                  }}
                >
                  <UserbarProfiles
                    onConfigClick={handleConfigClick}
                    onMobileClick={handleMobileClick}
                    currentUser={currentUser}
                  />
                </div>
              ) : (
                <div
                  style={{
                    ...barStyle,
                    ...barTransition[state as keyof typeof barTransition],
                  }}
                >
                  <UserBarConfig
                    currentUser={currentUser}
                    onBackButtonClick={handleBackButtonClick}
                    onPasswordButtonClick={handlePasswordButtonClick}
                  />
                </div>
              )
            }
          </Transition>
        </SwitchTransition>
      </UserBarContainer>
     
      <PasswordModal onCancel={handleCancelButton} isModalOpen={isModalOpen} />
    </>
  );
};

export default Userbar;
