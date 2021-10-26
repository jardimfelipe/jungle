import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useTheme } from 'styled-components';
import { Image, Box, Button, Label, Modal, Typography, Select, Textfield } from '../..';
import { ColumnButton } from '../../atoms/ColumnButton/ColumnButton.styled';
import { MenuCard, MenuButton } from './Workers.styled';
import { Transition } from 'react-transition-group';
import { TableMenuProps } from './Workers.type';

import { GridBtnLeft, GridBtnRight, ModalButton, ModalGrid } from '../Dashboard/Dashboard.styled';

import ModalSuccess from '../../../assets/ModalSuccess.svg';
import { useFormik } from 'formik';
import schema from './schema';
import { useDispatch, useSelector } from 'react-redux'
import { deleteCollaboratorRequest, editCollaboratorRequest, inactivateCollaboratorRequest } from '../../../store/modules/collaborator/actions';
import { RootState } from '../../../store';


const {Title, Text} = Typography;

const menuStyle = {
  transition: `200ms ease-in-out`,
  height: 0,
  width: 0,
};

const menuTransition = {
  entering: { width: 0, height: 0 },
  entered: { width: '150px', height: 'auto' },
  exiting: { width: 0, height: 0 },
  exited: { width: 0, height: 0 },
};

const TableMenu: React.FC<TableMenuProps> = ({ isOpen, onClose, usr }) => {
  const dispatch = useDispatch()
  const theme = useTheme();
  const [isModalOpen1, setModalOpen1 ] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const onClose1 = () => setModalOpen1(!isModalOpen1);
  const onClose2 = ()=> setModalOpen2(!isModalOpen2);
  const [ usuario, setUsuario ] = useState(usr);
  const { currentUser } = useSelector(({ login }: RootState) => login);
  
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
        name: usuario?.name == undefined ? '' : usuario?.name,
        email: usuario?.email == undefined ? '' : usuario?.email, 
        unity_location: usuario?.unity == undefined ? '' : usuario?.unity, 
        type_of_position: {
          value: usuario?.type_position == undefined ? '' : usuario?.type_position, 
          label: usuario?.type_position == undefined ? '' : usuario?.type_position
        }, 
        type_of_position_s: usuario?.type_position == undefined ? '' : usuario?.type_position,
        office: {
          value: usuario?.office == undefined ? '' : usuario?.office, 
          label: usuario?.office == undefined ? '' : usuario?.office
        }, 
        office_s: usuario?.office == undefined ? '' : usuario?.office,
        area_department_board:  {
          value: usuario?.department == undefined ? '' : usuario?.department, 
          label: usuario?.department == undefined ? '' : usuario?.department
        },
        area_department_board_s: usuario?.department == undefined ? '' : usuario?.department,
        people_leader:  {
          value: usuario?.people_leader == undefined ? '' : usuario?.people_leader, 
          label: usuario?.people_leader == undefined ? '' : usuario?.people_leader
        },
        people_leader_s: usuario?.people_leader == undefined ? '' : usuario?.people_leader,
        direct_manager_email:  usuario?.direct_manager_email == undefined ? '' : usuario?.direct_manager_email
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
          _id: usuario?._id == undefined ? '' : usuario?._id, 
          status: false,
          active: true
        } 

        dispatch(editCollaboratorRequest(objeto));
        
      },
      validateOnChange: false,
      validationSchema: schema
  })

  useEffect(()=>{
      
  }, [])

  return (
    <div>
      <Transition in={isOpen} timeout={200} unmountOnExit>
        {(state) => (
          <MenuCard
            style={{
              ...menuStyle,
              ...menuTransition[state as keyof typeof menuTransition],
            }}
          >
            <ul role="menu">
              <li role="menuitem">
                <Box
                  params={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '0 10px',
                  }}
                >
                  <ColumnButton onClick={onClose}>
                    <GrClose size="18" color={theme.colors.darkGray} />
                  </ColumnButton>
                </Box>
              </li>
              <li role="menuitem">
                <MenuButton onClick={onClose1}>Editar</MenuButton>
              </li>
              <li role="menuitem">
                <MenuButton>Reenviar e-mail</MenuButton>
              </li>
              <li role="menuitem" onClick={()=>{
                let objeto = {
                  _id: usuario?._id == undefined ? '' : usuario?._id, 
                  company: usuario?.company == undefined ? '' : usuario?.company,
                  name: usuario?.name == undefined ? '' : usuario?.name,
                  unity: usuario?.unity == undefined ? '' : usuario?.unity,
                  office: usuario?.office == undefined ? '' : usuario?.office,
                  people_leader: usuario?.people_leader == undefined ? '' : usuario?.people_leader,
                  email: usuario?.email == undefined ? '' : usuario?.email,
                  type_position: usuario?.type_position == undefined ? '' : usuario?.type_position,
                  department: usuario?.department == undefined ? '' : usuario?.department,
                  direct_manager_email: usuario?.direct_manager_email == undefined ? '' : usuario?.direct_manager_email,
                  cpf: usuario?.cpf == undefined ? '' : usuario?.cpf, 
                  rne: usuario?.rne == undefined ? '' : usuario?.rne, 
                  password: usuario?.password == undefined ? '' : usuario?.password,
                  genere: usuario?.genere == undefined ? '' : usuario?.genere,
                  age: usuario?.age == undefined ? '' : usuario?.age,
                  house_time: usuario?.house_time == undefined ? '' : usuario?.house_time, 
                  education: usuario?.education == undefined ? '' : usuario?.education,  
                  ethnicity: usuario?.ethnicity == undefined ? '' : usuario?.ethnicity,
                  sexual_orientation: usuario?.sexual_orientation == undefined ? '' : usuario?.sexual_orientation,
                  marital_status: usuario?.marital_status == undefined ? '' : usuario?.marital_status,
                  sons: usuario?.sons == undefined ? '' : usuario?.sons,
                  phone: usuario?.phone == undefined ? '' : usuario?.phone, 
                  photo: usuario?.photo == undefined ? '' : usuario?.photo, 
                  role: usuario?.role == undefined ? '' : usuario?.role,
                  status: false,
                  active: false
                }

                dispatch(inactivateCollaboratorRequest(objeto))
                
              }}>
                <MenuButton>Inativar</MenuButton>
              </li>
              <li role="menuitem">
                <MenuButton danger onClick={()=>{
                  let usr = usuario?._id == undefined ? {_id: ''} : {_id: usuario?._id}
                  dispatch(deleteCollaboratorRequest(usr));
                }}>Excluir</MenuButton>
              </li>
            </ul>


          </MenuCard>
        )}
      </Transition>
      <Modal width={1073} height={752} isOpen={isModalOpen1} onClose={onClose1}>
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
                name="unit_location"
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
                  formik.setFieldValue('office', value)
                  formik.setFieldValue('office_s', value == null ? null : value.value)
                }}
              />
            </div>

            <div style={{marginTop: 'calc(32px + 16px)'}}>
              <Label>Líder de pessoas</Label>
              <Select 
                options={listaLider} 
                value={formik.values.people_leader}
                onChange={(value)=>{
                  formik.setFieldValue('people_leader', value)                  
                  formik.setFieldValue('people_leader_s', value == null ? null : value.value)
                }}
              />
            </div>


            <Button style={{width: '265px', marginTop: '51px'}} onClick={()=>{
              onClose()
              onClose1()
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
              <Text>{formik.errors.type_of_position}</Text>
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
              <Text>{formik.errors.direct_manager_email}</Text>
            </div>

            <Button style={{width: '265px', marginTop: '51px'}} type="submit" variant="primary" onClick={()=>{
             onClose1()
             onClose2()
            }}>Editar Colaborador</Button>
          
          </Box>
        </Box>
      </form>
        
      </Modal>
      <Modal width={766} height={473} isOpen={isModalOpen2}>
          <Box params={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
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
                color: '#011F3B'
              }}>
                Colaborador editado com sucesso
              </Text>
            </Box>
            <Box params={{
              width: '319.64px',
              height: '270px'
            }}>
              <Image src={ModalSuccess} />
            </Box>              
          </Box>

          <ModalGrid>
            <GridBtnLeft variant="secondary">
              Fechar
            </GridBtnLeft>
            <GridBtnRight variant="primary">
              Voltar para colaboradores
            </GridBtnRight>
          </ModalGrid>
      </Modal>
    </div>
  );
};

export default TableMenu;
