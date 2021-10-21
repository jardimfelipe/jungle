import React, { useState } from 'react';
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

const TableMenu: React.FC<TableMenuProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const [isModalOpen1, setModalOpen1 ] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const onClose1 = () => setModalOpen1(!isModalOpen1);
  const onClose2 = ()=> setModalOpen2(!isModalOpen2);

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
        unit_location: '', 
        type_of_position: {value: '', label: ''}, 
        office: {value: '', label: ''}, 
        area_department_board:  {value: '', label: ''},
        people_leader:  {value: '', label: ''},
        direct_manager_email: ''
      },
      onSubmit: (values) => {
        console.warn('valores:', values)
      },
      validateOnChange: false,
      validationSchema: schema
  })

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
              <li role="menuitem">
                <MenuButton>Inativar</MenuButton>
              </li>
              <li role="menuitem">
                <MenuButton danger>Excluir</MenuButton>
              </li>
            </ul>


          </MenuCard>
        )}
      </Transition>
      <Modal width={1073} height={752} isOpen={isModalOpen1} onClose={onClose1}>

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
            />
                    
            <div style={{marginTop: '32px'}}>
              <Label>Unidade/localização</Label>
              <Textfield
                name="unit_location"
                value={formik.values.unit_location}
                onChange={formik.handleChange}
                placeholder="Digite e unidade ou localização"
              />
            </div>

            <div style={{marginTop: '32px'}}>
              <Label>Cargo</Label>
              <Select 
                options={listaCargo} 
                value={formik.values.office}
                onChange={(value)=>{
                  formik.setFieldValue('office', value)
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
                }}
              />
            </div>


            <Button style={{width: '265px', marginTop: '51px'}} variant="cancel">Cancelar</Button>
          
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
            />

            <div style={{marginTop: '32px'}}>
              <Label>Tipo de cargo</Label>
              <Select 
                options={listaTipoCargo} 
                value={formik.values.type_of_position}
                onChange={(value)=>{
                  formik.setFieldValue('type_of_position', value)
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
                }}  
              />
            </div>

            <div style={{marginTop: 'calc(32px + 16px)'}}>
              <Label>E-mail Gestor Direto</Label>
              <Textfield 
                name="direct_manager_email"
                value={formik.values.direct_manager_email}
                onChange={formik.handleChange}
                placeholder="Digite o e-mail do gestor direto" 
              />
            </div>

            <Button style={{width: '265px', marginTop: '51px'}} onClick={onClose2} variant="primary">Adicionar Colaborador</Button>
          
          </Box>

        </Box>
        
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
