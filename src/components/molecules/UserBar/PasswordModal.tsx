import React from 'react';

import { Box, Button, Modal, Textfield, Typography } from '../../';
import { FiEye, FiLock } from 'react-icons/fi';
import { ChangePasswordForm } from './UserBar.styled';

import { useFormik } from 'formik';
import schema from './schema';
import { PasswordModalProps } from './UserBar.types';

const { Title } = Typography;

const PasswordModal: React.FC<PasswordModalProps> = ({
  isModalOpen,
  onCancel,
}) => {
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
    <Modal height={700} width={400} isOpen={isModalOpen}>
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
        <ChangePasswordForm>
          <Textfield
            prefix={<FiLock />}
            suffix={<FiEye />}
            name="currentPassword"
            id="currentPassword"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            placeholder="Digite sua senha atual"
            label="Senha atual"
            error={
              !!formik.errors.currentPassword
                ? formik.errors.currentPassword
                : undefined
            }
          />
          <Textfield
            prefix={<FiLock />}
            suffix={<FiEye />}
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            placeholder="Digite sua nova senha"
            label="Nova senha"
            error={
              !!formik.errors.newPassword
                ? formik.errors.newPassword
                : undefined
            }
          />
          <Textfield
            prefix={<FiLock />}
            suffix={<FiEye />}
            name="confirmPassword"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Confirme sua nova senha"
            label="Confirmação de senha"
            error={
              !!formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
          />
        </ChangePasswordForm>
        <Button block variant="primary">
          Alterar senha
        </Button>
        <Button block onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};

export default PasswordModal;
