import React, { useEffect, useState, useRef } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import {
  Box,
  Button,
  IconButton,
  Table,
  Typography,
  // Avatar,
  Tag,
  ColumnButton,
  Select,
} from '../..';
import { BiSearch } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PromotionalCard from '../../molecules/PromotionalCard/PromotionalCard';
// import Profile from '../../../assets/profile.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  getUsersRequest,
  getUsersSuccess,
  resetUsersErrors,
} from '../../../store/modules/users/actions';
import { Field } from '../../molecules/Table/table.types';
import { useTheme } from 'styled-components';
import TableMenu from './TableMenu';
import CreateUser from './Modals/CreateUser';
import { useTranslation } from 'react-i18next';
import { Text } from '../../atoms/Typography/text';
import { getCollaboratorFail, getAllUsers } from '../../../store/modules/collaborator/actions';


const { Title } = Typography;

const Companies: React.FC = () => {
  const { t } = useTranslation();
  const lista = [
    {label: 'Todos', value: 'Todos'},
    {label: 'Ativo', value: 'Ativo'},
    {label: 'Inativo', value: 'Inativo'},
    {label: 'Pendente', value: 'Pendente'}
  ]
  const [ selecionaTipo, setSelecionaTipo ] = useState({label: 'Todos', value: 'Todos'})
  //let iteracaoDados = users.filter((u) => u.name)
  
  const tableFields: Field[] = [
    {
      title: t('table.headers.worker'),
      dataIndex: 'name',
      key: 'name',
      render: (value) => (
        <Box params={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* <Avatar image={Profile} /> */}
          {value}
        </Box>
      ),
    },
    {
      title: t('table.headers.sector'),
      dataIndex: 'department',
      key: 'department',
      render: (value) => value || '---',
    },
    {
      title: t('table.headers.function'),
      dataIndex: 'office',
      key: 'office',
      render: (value) => value || '---',
    },
    {
      title: t('table.headers.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('table.headers.phone'),
      dataIndex: 'phone',
      key: 'phone',
      render: (value) => value || '---',
    },
    {
      title: t('table.headers.status'),
      dataIndex: 'status',
      key: 'active',
      render: (value) => (
          <Tag size="large" color={value == undefined ? 'warning' : value == true ? 'success': 'default'}>
            {value == undefined ? 'Pendente' : value == true ? 'Ativo': 'Inativo'}
            {value}
          </Tag>
        ),
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      render: (value, item, index) => (
        <>
          <TableMenu
            onClose={() => handleCloseButton()}
            isOpen={currentOpenMenu === index}
            usr={item}
          />
          <ColumnButton onClick={() => handleTableButtonClick(index)}>
            <BsThreeDotsVertical color={theme.colors.black} size="24" />
          </ColumnButton>
        </>
      ),
    },
  ];
  const theme = useTheme();
  const [currentOpenMenu, setCurrentOpenMenu] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { users , isLoading } = useSelector((state: RootState) => state.users);

  const { currentUser } = useSelector(({ login }: RootState) => login);
  const { isConcluded } = useSelector(({ collaborator }: RootState) => collaborator)

  //users.filter((u) => u.name)
  let [ iteracaoDados, setIteracaoDados ] = useState(
    users.filter((u) => u.name)
  )  
  

  const handleTableButtonClick = (index: number) => {
    setCurrentOpenMenu(index);
  };

  const handleModalButton = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    dispatch(resetUsersErrors());
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    fetch(`${process.env.PUBLIC_URL}/resources/planilha-funcionarios.xlsx`, {
      method: 'GET',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `planilha-funcionarios.xlsx`);

        document.body.appendChild(link);

        link.click();

        link.parentNode?.removeChild(link);
      });
  };

  const handleCloseButton = () => {
    setCurrentOpenMenu(-1);
  };


  useEffect(() => {
    dispatch(getUsersRequest({ headers: { company: currentUser.company } }));


    console.warn('Selecionado: ' ,selecionaTipo)
    
    
    switch(selecionaTipo?.label){
      case 'Todos':
        setIteracaoDados(users.filter((u) => u.name))
        console.log('Selecionado: Todos')
      break;
      case 'Ativo':
        setIteracaoDados(users.filter((u) => u.active == true))
        console.log('Selecionado: Ativo')
      break;
      case 'Pendente':
        setIteracaoDados(users.filter((u) => u.active == undefined))
        console.log('Selecionado: Pendente')
      break;
      case 'Inativo':
        setIteracaoDados(users.filter((u) => u.active == false))
        console.log('Selecionado: Inativo')
      break;
      default:
        setIteracaoDados(users.filter((u) => u.name))
        console.log('Selecionado: Todos')
      break;
    }
 

    if(isConcluded == true){
      console.warn('carregar', isConcluded  ? 'Carregar' : 'Não carregar')
      dispatch(getAllUsers())
      dispatch(getCollaboratorFail())
    }


  }, [dispatch, currentUser, selecionaTipo, isConcluded]);




  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title={t('greetings.workers.title')}
        text={t('greetings.workers.text')}
      />

      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3}>{t('menu.workers')}</Title>
        <Box
          params={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}
        >
          <IconButton icon={<BiSearch />} />
          <Box
            params={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 60%',
            }}
          >
            <Button
              onClick={handleDownload}
              block
              size="small"
              variant="secondary"
            >
              {t('button.downloadSpreadsheet')}
            </Button>
          </Box>
          <Box
            params={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 60%',
            }}
          >
            <Button
              onClick={handleModalButton}
              block
              size="small"
              variant="primary"
            >
              {t('button.registerUsers')}
            </Button>
          </Box>
          
        </Box>
        
      </Box>
      <Box 
            params={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%'
            }}
          >
          <div style={{marginRight: '30px'}}>Status</div>
          <div style={{width: '265px'}}>
            <Select 
              value={selecionaTipo}
              
              options={lista}
              onChange={(e)=>{
                  setSelecionaTipo({label: e?.label, value: e?.value}) 
                  console.log(iteracaoDados, selecionaTipo)
              }}
            />
          </div>
          </Box>

      
        <Row>
          <Col xs>
            <Table
              items={iteracaoDados}
              fields={tableFields}
              isLoading={
                isConcluded == true || isLoading == true ? true : false
              }
            />
          </Col>
        </Row>
      

      {/* <Text>{isConcluded  ? 'Carregar' : 'Não carregar'}</Text> */}
      
      <CreateUser onClose={handleModalClose} isModalOpen={isModalOpen}  />
    </Box>
  );
};

export default Companies;
