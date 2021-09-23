import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { loginRequest } from '../../../store/modules/login/actions';

import { LoginContainer, LoginForm } from './login.styled';
import {
  Box,
  Button,
  Typography,
  Textfield,
  Label,
  Checkbox,
  LanguageSelect,
  LoggedOutTemplate,
} from '../..';
import { HiOutlineMail } from 'react-icons/hi';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

import JungleLogo from '../../../assets/jungle.png';
import { Image } from '../../atoms/Image/Image.styled';
import { useFormik } from 'formik';
import schema from './schema';

import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const { isLoggedIn, error, isLoading } = useSelector(
    ({ login }: RootState) => login
  );
  const [isPasswordType, setIsPasswordType] = useState(true);
  const [rememberUser, setRememberUser] = useState(false);

  const handleInputType = () => {
    setIsPasswordType(!isPasswordType);
  };

  const handleCheckboxChange = () => {
    setRememberUser(!rememberUser);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(loginRequest(values));
    },
    validateOnChange: false,
    validationSchema: schema,
  });

  useEffect(() => {
    isLoggedIn && history.push('/');
  }, [isLoggedIn, history]);

  return (
    <LoggedOutTemplate>
      <LoginContainer>
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
          <Title level={2}>{t('niceHaveYouHere')}</Title>
        </Box>
        <LoginForm onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
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
          <div>
            <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
              <Label>{t('password')}</Label>
              <Link to="/forgot-password">Esqueci minha senha &gt;</Link>
            </Box>
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
              error={
                !!formik.errors.password ? formik.errors.password : undefined
              }
            />
          </div>

          <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
            <Checkbox
              checked={rememberUser}
              onChange={handleCheckboxChange}
              label={t('rememberUser')}
            />
            <Box params={{ flex: '0 0 100px' }}>
              <LanguageSelect />
            </Box>
          </Box>

          <Button isLoading={isLoading} type="submit" block variant="primary">
            {t('login')}
          </Button>
          {error.status && (
            <Box params={{ display: 'flex', justifyContent: 'center' }}>
              <Text color={theme.colors.p1} textDecoration="strong">
                {error.message}
              </Text>
            </Box>
          )}
        </LoginForm>
      </LoginContainer>
    </LoggedOutTemplate>
  );
};

export default Login;
