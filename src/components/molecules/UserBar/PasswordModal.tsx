import React, { useState } from 'react';

import { Box, Button, Modal, Textfield, Typography } from '../../';
import { FiEye, FiLock, FiEyeOff } from 'react-icons/fi';
import { ChangePasswordForm, PasswordIcon } from './UserBar.styled';

import { useFormik } from 'formik';
import schema from './schema';
import { PasswordModalProps } from './UserBar.types';

const { Title } = Typography;

type Inputs = 'currentPassword' | 'newPassword' | 'confirmPassword';

const PasswordModal: React.FC<PasswordModalProps> = ({
  isModalOpen,
  onCancel,
}) => {
  const [inputTypes, setInputTypes] = useState({
    currentPassword: 'password',
    newPassword: 'password',
    confirmPassword: 'password',
  });

  const handleInputTypeChange = (input: Inputs) => {
    if (inputTypes[input] === 'password') {
      setInputTypes({ ...inputTypes, [input]: 'text' });
    } else {
      setInputTypes({ ...inputTypes, [input]: 'password' });
    }
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false,
    validationSchema: schema,
  });

  return (
    <Modal height={700} width={400} isOpen={isModalOpen} onClose={onCancel}>
      <Box
        params={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '25px 32px',
          gap: '15px',
        }}
      >
        <Title level={3}>Alterar senha</Title>
        <ChangePasswordForm onSubmit={formik.handleSubmit}>
          <Textfield
            prefix={<FiLock />}
            suffix={
              <PasswordIcon
                onClick={() => handleInputTypeChange('currentPassword')}
                as={
                  inputTypes.currentPassword === 'password' ? FiEye : FiEyeOff
                }
              />
            }
            name="currentPassword"
            id="currentPassword"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            placeholder="Digite sua senha atual"
            label="Senha atual"
            type={inputTypes.currentPassword}
            error={
              !!formik.errors.currentPassword
                ? formik.errors.currentPassword
                : undefined
            }
          />
          <Textfield
            prefix={<FiLock />}
            suffix={
              <PasswordIcon
                onClick={() => handleInputTypeChange('newPassword')}
                as={inputTypes.newPassword === 'password' ? FiEye : FiEyeOff}
              />
            }
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            placeholder="Digite sua nova senha"
            type={inputTypes.newPassword}
            label="Nova senha"
            error={
              !!formik.errors.newPassword
                ? formik.errors.newPassword
                : undefined
            }
          />
          <Textfield
            prefix={<FiLock />}
            suffix={
              <PasswordIcon
                onClick={() => handleInputTypeChange('confirmPassword')}
                as={
                  inputTypes.confirmPassword === 'password' ? FiEye : FiEyeOff
                }
              />
            }
            name="confirmPassword"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Confirme sua nova senha"
            label="Confirmação de senha"
            type={inputTypes.confirmPassword}
            error={
              !!formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
          />
          <Button block variant="primary">
            Alterar senha
          </Button>
        </ChangePasswordForm>
        <Button block onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};

export default PasswordModal;
