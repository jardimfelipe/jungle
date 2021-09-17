import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';

import { SnackbarContainer } from './Snackbar.styled';
import { Typography } from '../../';
import { setSnackbarClose } from '../../../store/modules/base/actions';

const { Text } = Typography;

const Snackbar: React.FC = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector(({ base }: RootState) => base);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (snackbar.snackbarState) {
      timer = setTimeout(() => {
        dispatch(setSnackbarClose());
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [snackbar.snackbarState, dispatch]);
  return snackbar.snackbarState ? (
    <SnackbarContainer>
      <Text textDecoration="strong">{snackbar.snackbarMessage}</Text>
    </SnackbarContainer>
  ) : null;
};

export default Snackbar;
