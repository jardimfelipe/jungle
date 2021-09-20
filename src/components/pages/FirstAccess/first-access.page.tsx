import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { firstAccessRequest } from '../../../store/modules/login/actions';

import {
  FirstAccessContainer,
  FirstAccessForm,
  FirstAccessImage,
  FirstAccessRow,
} from './first-access.styled';
import { Col } from 'react-flexbox-grid';
import { Box, Button, Typography, Textfield, Modal } from '../..';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FiLock, FiEye, FiEyeOff, FiMail, FiKey } from 'react-icons/fi';

import JungleLogo from '../../../assets/jungle.png';
import { Image } from '../../atoms/Image/Image.styled';
import { useFormik } from 'formik';
import schema from './schema';

import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ModalButton } from '../Dashboard/Dashboard.styled';

const { Title, Text } = Typography;

const FirstAccess: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const { error, isLoading, firstAccessFeedback } = useSelector(
    ({ login }: RootState) => login
  );

  const [isPasswordType, setIsPasswordType] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputType = () => {
    setIsPasswordType(!isPasswordType);
  };

  const handleClick = () => {
    history.push('/login');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      code: '',
    },
    onSubmit: (values) => {
      dispatch(firstAccessRequest(values));
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
    <FirstAccessRow>
      <Col className="login-col" xs={12} md={7}>
        <FirstAccessImage></FirstAccessImage>
      </Col>
      <Col xs>
        <FirstAccessContainer>
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
            <Title level={2}>{t('itsYourFirstAccess')}</Title>
            <Text>{t('createYourPassword')}</Text>
          </Box>
          <FirstAccessForm
            onSubmit={formik.handleSubmit}
            style={{ width: '100%' }}
          >
            <Textfield
              prefix={<FiMail />}
              type="email"
              placeholder={t('informYourEmail')}
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              label="E-mail"
              error={!!formik.errors.email ? formik.errors.email : undefined}
            />

            <Textfield
              prefix={<FiLock />}
              suffix={
                isPasswordType ? (
                  <FiEye onClick={handleInputType} />
                ) : (
                  <FiEyeOff onClick={handleInputType} />
                )
              }
              type={isPasswordType ? 'password' : 'text'}
              placeholder={t('informYourPassword')}
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              label={t('password')}
              error={
                !!formik.errors.password ? formik.errors.password : undefined
              }
            />

            <Textfield
              prefix={<FiKey />}
              type="text"
              placeholder={t('informYourCode')}
              name="code"
              id="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              label={t('code')}
              error={!!formik.errors.code ? formik.errors.code : undefined}
            />

            <Button isLoading={isLoading} type="submit" block variant="primary">
              {t('createPassword')}
            </Button>

            {error.status && (
              <Box params={{ display: 'flex', justifyContent: 'center' }}>
                <Text color={theme.colors.p1} textDecoration="strong">
                  {error.message}
                </Text>
              </Box>
            )}
          </FirstAccessForm>
        </FirstAccessContainer>
      </Col>

      <Modal isOpen={isModalOpen} hasCloseButton={false}>
        <Box params={{ padding: '80px 35px', textAlign: 'center' }}>
          <AiFillCheckCircle size={100} color={theme.colors.p3} />
          <Title level={2}>{t('firstAccessSuccessfull')}</Title>
        </Box>
        <ModalButton onClick={handleClick} variant="primary">
          {t('button.backToLogin')}
        </ModalButton>
      </Modal>
    </FirstAccessRow>
  );
};

export default FirstAccess;
