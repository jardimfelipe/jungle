import React, { useEffect, useState } from 'react';

import {
  Box,
  LoggedOutTemplate,
  Image,
  Typography,
  Textfield,
  Button,
  Modal,
} from '../..';
import { Container, LostForm } from './ForgotPassword.styled';
import { HiOutlineMail } from 'react-icons/hi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { ModalButton } from '../Dashboard/Dashboard.styled';

import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import JungleLogo from '../../../assets/jungle.png';
import schema from './schema';

import { RootState } from '../../../store';
import { forgotPasswordRequest } from '../../../store/modules/login/actions';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { error, isLoading, firstAccessFeedback } = useSelector(
    ({ login }: RootState) => login
  );

  const handleClick = () => {
    history.push('/login');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      dispatch(forgotPasswordRequest(values.email));
    },
    validateOnChange: false,
    validationSchema: schema,
  });

  useEffect(() => {
    if (firstAccessFeedback === 'success') {
      setIsModalOpen(true);
    }
  }, [firstAccessFeedback]);

  return (
    <LoggedOutTemplate>
      <Container>
        <Box
          params={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Image style={{ width: '150px' }} src={JungleLogo} alt="Jungle" />
        </Box>
        <Box params={{ width: '100%', textAlign: 'left' }}>
          <Title level={2}>{t('recoveryPassword')}</Title>
        </Box>
        <LostForm onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <Textfield
            prefix={<HiOutlineMail />}
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder={t('informYourEmail')}
            label="E-mail"
            error={!!formik.errors.email ? formik.errors.email : undefined}
          />

          <Button isLoading={isLoading} type="submit" block variant="primary">
            {t('button.send')}
          </Button>
          <Box params={{ textAlign: 'center' }}>
            <Link to="/login">{t('button.backToLogin')}</Link>
          </Box>
          {error.status && (
            <Box params={{ display: 'flex', justifyContent: 'center' }}>
              <Text color={theme.colors.p1} textDecoration="strong">
                {error.message}
              </Text>
            </Box>
          )}
        </LostForm>
      </Container>

      <Modal isOpen={isModalOpen} hasCloseButton={false}>
        <Box params={{ padding: '80px 35px', textAlign: 'center' }}>
          <AiFillCheckCircle size={100} color={theme.colors.p3} />
          <Title level={2}>{t('recoverySent')}</Title>
        </Box>
        <ModalButton onClick={handleClick} variant="primary">
          {t('button.backToLogin')}
        </ModalButton>
      </Modal>
    </LoggedOutTemplate>
  );
};

export default ForgotPassword;
