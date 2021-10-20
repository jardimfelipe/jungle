import React, { useCallback, useEffect, useState } from 'react';

import { Box, Modal, Typography, FileUploader } from '../../..';
import { ModalButton } from '../../../pages/Dashboard/Dashboard.styled';
import ProgressBar from '@ramonak/react-progress-bar';
import { Oval } from 'react-loading-icons';

import {
  createUsersRequest,
  getUsersRequest,
} from '../../../../store/modules/users/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';

import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { FaCheckCircle } from 'react-icons/fa';
import { Formik, useFormik } from 'formik';

import schema from '../schema'

const { Title, Text } = Typography;

type ModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
};

const CreateUser: React.FC<ModalProps> = ({ onClose, isModalOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { userFileProgress, isFileLoading, error, fileSuccess } = useSelector(
    (state: RootState) => state.users
  );
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const [currentFile, setCurrentFile] = useState<FormData | undefined>(
    undefined
  );

  const handleFileChange = useCallback((files: File[]) => {
    if (!files.length) return setCurrentFile(undefined);
    const data = new FormData();
    data.append('file', files[0], files[0].name);
    setCurrentFile(data);
  }, []);

  const handleSubmit = () => {
    if (fileSuccess) onClose();
    if (currentFile) dispatch(createUsersRequest(currentFile));
  };
  const successFeedback = () => {
    return (
      <Box
        params={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FaCheckCircle size="120" color={theme.colors.p3} />
        <Title level={2}>Usuários cadastrados com sucesso!</Title>
      </Box>
    );
  };

  const usersFileUploader = () => {
    return (
      <Box
        params={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '25px 32px',
        }}
      >
        <Title style={{ alignSelf: 'flex-start' }} variant="primary" level={4}>
          Cadastrar usuários
        </Title>
        <FileUploader onChange={handleFileChange} />

        {error.status && (
          <Box
            params={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15px',
            }}
          >
            <Text color={theme.colors.p1} textDecoration="strong">
              {error.message}
            </Text>
          </Box>
        )}
      </Box>
    );
  };

  const buttonContent = () => {
    const text = fileSuccess ? 'Fechar' : 'Enviar planilha';
    return isFileLoading ? <Oval height="28" /> : text;
  };

  useEffect(() => {
    fileSuccess &&
      dispatch(getUsersRequest({ headers: { company: currentUser.company } }));
  }, [fileSuccess, dispatch, currentUser]);

<<<<<<< Updated upstream
=======
  const listaTipoCargo = [
    {label: 'Selecione', value: ''},
    {label: 'Gestor-supervisão ou gerência operacional', value: 'Gestor-supervisão ou gerência operacional'},
    {label: 'Gestor-média gerência', value: 'Gestor-média gerência'},
    {label: 'Gestor-Presidência/Diretoria', value: 'Gestor-Presidência/Diretoria'},
    {label: 'Colaborador', value: 'Colaborador'},
    {label: 'Terceirizado/Outsourcing', value: 'Terceirizado/Outsourcing'}
  ]
  const listaCargo = [
    {label: 'Selecione', value: ''},
    {label: 'Executivo e gestor sênior', value: 'Executivo e gestor sênior'},
    {label: 'Gerente e supervisor', value: 'Gerente e supervisor'},
    {label: 'Coordenador', value: 'Coordenador'},
    {label: 'Especialista', value: 'Especialista'},
    {label: 'Técnico', value: 'Técnico'},
    {label: 'Analista', value: 'Analista'},
    {label: 'Administrativo', value: 'Administrativo'},
    {label: 'Operacional', value: 'Operacional'},
    {label: 'Estagiário', value: 'Estagiário'},
    {label: 'Médico', value: 'Médico'},
    {label: 'Enfermeiro', value: 'Enfermeiro'}
  ]
  const listaArea = [
    {label: 'Selecione', value: ''},
    {label: 'Administrativo/Financeiro', value: 'Administrativo/Financeiro'},
    {label: 'Jurídico/Auditoria/Compliance', value: 'Jurídico/Auditoria/Compliance'},
    {label: 'Logística/Supply Chain', value: 'Logística/Supply Chain'},
    {label: 'Manutenção', value: 'Manutenção'},
    {label: 'Marketing/Sucesso do Cliente', value: 'Marketing/Sucesso do Cliente'},
    {label: 'Produção/Operação', value: 'Produção/Operação'},
    {label: 'Qualidade/Processos', value: 'Qualidade/Processos'},
    {label: 'Recursos Humanos/Medicina do Trabalho', value: 'Recursos Humanos/Medicina do Trabalho'},
    {label: 'Regionais/Agências/Representantes', value: 'Regionais/Agências/Representantes'},
    {label: 'Tecnologia da Informação', value: 'Tecnologia da Informação'},
    {label: 'Vendas/Comercial', value: 'Vendas/Comercial'}
  ]
  const listaLider = [
    {label: 'Selecione', value: ''},
    {label: 'Não', value: 'Não'},
    {label: 'Sim', value: 'Sim'}
  ]

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      unity_location: '',
      office: {value: '', label: ''},
      type_of_position: {value: '', label: ''},
      position: {value: '', label: ''},
      area_department_board: {value: '', label: ''},
      people_leader: {value: '', label: ''},
      email_manager: ''
    }, 
    onSubmit: (values) => {
      console.log(values)
    },
    validateOnChange: false,
    validationSchema: schema,
  })

>>>>>>> Stashed changes
  return (
    <Modal width={550} height={500} isOpen={isModalOpen} onClose={onClose}>
      {isFileLoading && (
        <Box
          params={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
<<<<<<< Updated upstream
          <ProgressBar
            bgColor={theme.colors.blue}
            height="3px"
            completed={userFileProgress}
            baseBgColor={rgba(theme.colors.blue, 0.1)}
            isLabelVisible={false}
            transitionDuration="0.3s"
          />
=======
          {buttonContent()}
        </ModalButton>
      </Modal>
      <Modal width={1073} height={752} isOpen={isModalOpen2} onClose={()=>{
        onClose();
        onClose2();
        }}>

        <Box params={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: '64px'
        }}>
          <Box params={{
            display: 'flex',
            flexDirection: 'column',
            width: '443px'
          }}>
            <Label>Nome completo</Label>
            <Textfield 
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={!!formik.errors.name ? formik.errors.name : undefined}
              placeholder="Digite o nome completo" 
            />
                    
            <div style={{marginTop: '32px'}}>
              <Label>Unidade/localização</Label>
              <Textfield 
                name="unit_location"
                value={formik.values.unity_location}
                onChange={formik.handleChange}
                error={!!formik.errors.unity_location ? formik.errors.unity_location : undefined}
                placeholder="Digite e unidade ou localização" 
              />
            </div>

            <div style={{marginTop: '32px'}}>
              <Label>Cargo</Label>
              <Select 
                value={formik.values.office}
                onChange={(value)=>{
                  formik.setFieldValue('office', value)
                }}  
                options={listaCargo} 
              />
            </div>

            <div style={{marginTop: '32px'}}>
              <Label>Líder de pessoas</Label>
              <Select 
                value={formik.values.people_leader} 
                onChange={(value)=>{
                  formik.setFieldValue('people_leader', value)
                }}
                options={listaLider} 
              />
            </div>

            <Button style={{width: '265px', marginTop: '51px'}} onClick={onClose2} variant="cancel">Cancelar</Button>
          
          </Box>
          <Box params={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '32px',
            width: '443px'
          }}>
            <Label>E-mail</Label>
            <Textfield 
              name="email"
              value={formik.values.email} 
              onChange={formik.onChange}
              placeholder="Digite o e-mail" 
            />

            <div style={{marginTop: '32px'}}>
              <Label>Tipo de cargo</Label>
              <Select 
                value={formik.values.type_of_position}
                onChange={(value)=>{
                  formik.setFieldValue('type_of_position', value)
                }}
                options={listaTipoCargo} 
              />
            </div>

            <div style={{marginTop: 'calc(32px + 15px)'}}>
              <Label>Área/departamento/diretoria</Label>
              <Select    
                value={formik.values.area_department_board}
                onChange={(value) => {
                  formik.setFieldValue('area_department_board', value);
                }}
                options={listaArea} 
              />
            </div>

            <div style={{marginTop: 'calc(32px +15px)'}}>
              <Label>E-mail Gestor Direto</Label>
              <Textfield 
                name="email_manager"
                value={formik.values.email_manager}
                onChange={formik.handleChange}
                error={!!formik.errors.email_manager ? formik.errors.email_manager : undefined}
                placeholder="Digite o e-mail do gestor direto" 
              />
            </div>

            <Button style={{width: '265px', marginTop: '51px'}} onClick={onClose3} variant="primary">Adicionar Colaborador</Button>

          </Box>
>>>>>>> Stashed changes
        </Box>
      )}

      {fileSuccess ? successFeedback() : usersFileUploader()}

      <ModalButton
        disabled={!currentFile || isFileLoading}
        onClick={handleSubmit}
        variant="primary"
        block
      >
        {buttonContent()}
      </ModalButton>
    </Modal>
  );
};

export default CreateUser;
