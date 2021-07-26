import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { loginRequest, resetStore } from '../../../store/modules/login/actions';

import {
  AdminAccessContainer,
  LoginContainer,
  LoginForm,
  LoginImage,
  LoginRow,
} from './login.styled';
import { Col } from 'react-flexbox-grid';
import { Box, Button, Typography, Textfield, Label, Checkbox } from '../..';
import { HiOutlineMail } from 'react-icons/hi';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

import JungleLogo from '../../../assets/jungle.png';
import MindsMatter from '../../../assets/mindsmatter-logo.png';
import { Image } from '../../atoms/Image/Image.styled';
import { useFormik } from 'formik';
import schema from './schema';

import { useTheme } from 'styled-components';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, error, isLoading } = useSelector(
    ({ login }: RootState) => login
  );
  const [isPasswordType, setIsPasswordType] = useState(true);

  const handleInputType = () => {
    setIsPasswordType(!isPasswordType);
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

  useEffect(() => {
    dispatch(resetStore());
  }, [dispatch]);

  return (
    <LoginRow>
      <Col className="login-col" xs={12} md={7}>
        <LoginImage></LoginImage>
      </Col>
      <Col xs>
        <LoginContainer>
          <Box
            params={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Image style={{ width: '150px' }} src={JungleLogo} alt="Jungle" />
            <Image
              style={{ width: '100px' }}
              src={MindsMatter}
              alt="#MindsMatter"
            />
          </Box>
          <Box params={{ width: '100%', textAlign: 'left' }}>
            <Title level={2}>Que bom ter você por aqui.</Title>
          </Box>
          <LoginForm onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <Textfield
              prefix={<HiOutlineMail />}
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Digite seu email"
              label="E-mail"
              error={!!formik.errors.email ? formik.errors.email : undefined}
            />
            <div>
              <Box
                params={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Label>Senha</Label>
                <a href="/">Esqueci minha senha &gt;</a>
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
                placeholder="Informe sua senha"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  !!formik.errors.password ? formik.errors.password : undefined
                }
              />
            </div>
            <Checkbox checked={false} label="Lembrar usuário" />
            <Button isLoading={isLoading} type="submit" block variant="primary">
              Acessar
            </Button>
            {error.status && (
              <Box params={{ display: 'flex', justifyContent: 'center' }}>
                <Text color={theme.colors.p1} textDecoration="strong">
                  {error.message}
                </Text>
              </Box>
            )}
          </LoginForm>
          <AdminAccessContainer>
            <a href="/">Acessar como administrador</a>
          </AdminAccessContainer>
        </LoginContainer>
      </Col>
    </LoginRow>
  );
};

export default Login;
