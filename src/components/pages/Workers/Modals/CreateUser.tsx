import React, { useCallback, useEffect, useState } from 'react';

import { Image, Box, Modal, Typography, FileUploader, Button, Textfield, Label, Select } from '../../..';
import { GridBtnLeft, GridBtnRight, ModalButton, ModalGrid } from '../../../pages/Dashboard/Dashboard.styled';
import ProgressBar from '@ramonak/react-progress-bar';
import { Oval } from 'react-loading-icons';

import {
  createUsersRequest,
  getUsersRequest,
} from '../../../../store/modules/users/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';


import { useFormik } from 'formik'
import schema from '../schema';

import ModalSuccess from '../../../../assets/ModalSuccess.svg';
import AddUser from      '../../../../assets/AddUser.svg';
import AddDocument from  '../../../../assets/AddDocument.svg';

import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { FaCheckCircle } from 'react-icons/fa';

import { createCollaboratorRequest, getAllUsers, getCollaboratorFail } from '../../../../store/modules/collaborator/actions'

const { Title, Text } = Typography;



type ModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
  reload?: () => void;
};

const CreateUser: React.FC<ModalProps> = ({ onClose, isModalOpen, reload }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { userFileProgress, isFileLoading, error, fileSuccess } = useSelector(
    (state: RootState) => state.users
  );
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const [currentFile, setCurrentFile] = useState<FormData | undefined>(
    undefined
  );
  const [isModalOpen1, setModal1] = useState(false); 
  const [isModalOpen2, setModal2] = useState(false);
  const [isModalOpen3, setModal3] = useState(false);
  const onClose1 = ()=>setModal1(!isModalOpen1);
  const onClose2 = ()=>setModal2(!isModalOpen2);
  const onClose3 = ()=>setModal3(!isModalOpen3);


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

  const listaTipoCargo = [
    
    {label: 'Gestor-supervisão ou gerência operacional', value: 'Gestor-supervisão ou gerência operacional'},
    {label: 'Gestor-média gerência', value: 'Gestor-média gerência'},
    {label: 'Gestor-Presidência/Diretoria', value: 'Gestor-Presidência/Diretoria'},
    {label: 'Colaborador', value: 'Colaborador'},
    {label: 'Terceirizado/Outsourcing', value: 'Terceirizado/Outsourcing'}
  ]
  const listaCargo = [
    
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
    {label: 'Não', value: 'Não'},
    {label: 'Sim', value: 'Sim'}
  ]

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      unity_location: '', 
      type_of_position: {value: '', label: 'Selecione'},
      type_of_position_s: '',

      office:  {value: '', label: 'Selecione'},
      office_s: '',

      area_department_board:  {value: '', label: 'Selecione'},
      area_department_board_s: '',

      people_leader:  {value: '', label: 'Selecione'},
      people_leader_s: '',

      direct_manager_email: ''

      
    },
    onSubmit: (values) => {
      console.log(currentUser)
      let objeto = {
        name: values.name,
        unity: values.unity_location,
        office: values.office_s,
        people_leader: values.people_leader_s,
        email: values.email,
        type_position: values.type_of_position_s,
        department: values.area_department_board_s,
        direct_manager_email: values.direct_manager_email,
        cpf: '',
        rne: '',  
        company: currentUser.company,
        password: '1234',
        genere: '',
        age: '',
        house_time: '', 
        education: '',  
        ethnicity: '',
        sexual_orientation: '',
        marital_status: '',
        sons: '',
        phone: '', 
        photo: '', 
        role: '',
        active: false
      } 
      dispatch(createCollaboratorRequest(objeto));
      dispatch(getAllUsers())
      dispatch(getCollaboratorFail())
    },
    validateOnChange: false,
    validationSchema: schema
  })

  function limpar(){
    formik.setFieldValue('name', '')
    formik.setFieldValue('email', '')
    formik.setFieldValue('unity_location', '') 
    formik.setFieldValue('type_of_position', {value: '', label: 'Selecione'})
    formik.setFieldValue('type_of_position_s', '')
    formik.setFieldValue('office',  {value: '', label: 'Selecione'})
    formik.setFieldValue('office_s', '')
    formik.setFieldValue('area_department_board',  {value: '', label: 'Selecione'})
    formik.setFieldValue('area_department_board_s', '')
    formik.setFieldValue('people_leader',  {value: '', label: 'Selecione'})
    formik.setFieldValue('people_leader_s', '')
    formik.setFieldValue('direct_manager_email', '')
  }
  

  return (
    <div>

      <Modal width={581} height={455} onClose={onClose} isOpen={isModalOpen}>
        <Box params={{
          width: '443px',
          paddingLeft: '69px',
          paddingRight: '69px',
        }}>
          <Text style={{
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '24px',
            lineHeight: '28px',
            color: '#0062FF'   
          }}> 
            Cadastrar colaborador
          </Text>

          <Button variant="primary" onClick={onClose2} style={{
            width: '443px',
            height: '126px',
            marginTop: '28px',
            marginBottom: '20px'
          }}>
            <Box params={{ 
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}>
              <Image style={{width: '46.94px', marginLeft: '38.56px'}} src={AddUser} />
              <span>Cadastrar manualmente um novo colaborador.</span>
            </Box>
          </Button>
          <Button variant="primary" onClick={onClose1} style={{
            width: '443px',
            height: '126px'
          }}>
            <Box params={{ 
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}>
              <Image style={{width: '46.94px', marginLeft: '38.56px'}} src={AddDocument} />
              <span>Cadastrar múltiplos colaboradores via planilha.</span>
            </Box>
          </Button>
        </Box>
      </Modal>
      <Modal width={550} height={500} isOpen={isModalOpen1} onClose={onClose1}>
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
            <ProgressBar
              bgColor={theme.colors.blue}
              height="3px"
              completed={userFileProgress}
              baseBgColor={rgba(theme.colors.blue, 0.1)}
              isLabelVisible={false}
              transitionDuration="0.3s"
            />
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
      <Modal width={1073} height={752} isOpen={isModalOpen2} onClose={()=>{
        onClose();
        onClose2();
        limpar()
        }}>
      
      <form onSubmit={formik.handleSubmit}>
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
              placeholder="Digite o nome completo" 
              error={!!formik.errors.name ? formik.errors.name : undefined }
            />
                    
            <div style={{marginTop: '32px'}}>
              <Label>Unidade/localização</Label>
              <Textfield 
                name="unity_location"
                value={formik.values.unity_location}
                onChange={formik.handleChange}
                placeholder="Digite e unidade ou localização" 
                error={!!formik.errors.unity_location ? formik.errors.unity_location : undefined }
              />
            </div>

            <div style={{marginTop: '32px'}}>
              <Label>Cargo</Label>
              <Select 
                options={listaCargo} 
                value={formik.values.office}
                onChange={(value)=>{
                  formik.setFieldValue('office', value);
                  formik.setFieldValue('office_s', value == null ? null : value.value)
                }}
              />
              <Text>{formik.errors.office}</Text>
            </div>

            <div style={{marginTop: 'calc(32px + 16px)'}}>
              <Label>Líder de pessoas</Label>
              <Select 
                options={listaLider} 
                value={formik.values.people_leader}
                onChange={(value)=>{
                  formik.setFieldValue('people_leader', value)
                  formik.setFieldValue('people_leader_s',  value == null ? null : value.value)
                  
                }}
              />
              <Text>{formik.errors.people_leader}</Text>
            </div>

            <Button style={{width: '265px', marginTop: '51px'}} onClick={()=>{
              onClose2();
              limpar();  
            }} variant="cancel">Cancelar</Button>
          
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
              onChange={formik.handleChange}
              placeholder="Digite o e-mail"
              error={!!formik.errors.email ? formik.errors.email : undefined }
            />

            <div style={{marginTop: '32px'}}>
              <Label>Tipo de cargo</Label>
              <Select 
                options={listaTipoCargo} 
                value={formik.values.type_of_position}
                onChange={(value)=>{
                  formik.setFieldValue('type_of_position', value)
                  formik.setFieldValue('type_of_position_s', value == null ? null : value.value)

                }}
              />
            </div>

            <div style={{marginTop: 'calc(32px + 16px)'}}>
              <Label>Área/departamento/diretoria</Label>
              <Select    
                options={listaArea} 
                value={formik.values.area_department_board}
                onChange={(value)=>{
                  formik.setFieldValue('area_department_board', value)
                  formik.setFieldValue('area_department_board_s', value == null ? null : value.value)

                }}
              />
              <Text>{formik.errors.area_department_board}</Text>
            </div>

            <div style={{marginTop: 'calc(32px + 16px)'}}>
              <Label>E-mail Gestor Direto</Label>
              <Textfield 
                name="direct_manager_email"
                value={formik.values.direct_manager_email}
                onChange={formik.handleChange}
                placeholder="Digite o e-mail do gestor direto" 
                error={!!formik.errors.direct_manager_email ? formik.errors.direct_manager_email : undefined }
              />
            </div>

            <Button style={{width: '265px', marginTop: '51px'}}  type="submit" onClick={()=>{onClose2();onClose();}}  variant="primary">Adicionar Colaborador</Button>

          </Box> 
        </Box>
      </form> 
         
      </Modal>
      <Modal width={766} height={473}  isOpen={isModalOpen3} hasCloseButton={false}>
          <Box params={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '66px'
          }}>
            <Box params={{
              width: '235px',
              marginRight: '151px',
              marginLeft: '41px'
            }}>
              <Text style={{
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '28px',
                lineHeight: '33px',
                color: '#011F3B',

              }}>
                Colabor cadastrado com sucesso
              </Text>
            </Box>
            <Box params={{
              width: '319.64px',
              height: '270px',
              
            }}>
              <Image src={ModalSuccess} />
            </Box>
          </Box> 

          <ModalGrid>
            <GridBtnLeft variant="secondary"
              onClick={()=>{
                onClose()
                onClose2()
                onClose3()
                limpar()
              }}
            >Fechar</GridBtnLeft>
            <GridBtnRight variant="primary" onClick={()=>{
                limpar()
                onClose3()
            }}>Cadastrar novo colaborador</GridBtnRight>
          </ModalGrid>
        
      </Modal>

    </div>
  );
};

export default CreateUser;
