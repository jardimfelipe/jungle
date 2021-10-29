import React, { useEffect, useState, useRef } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import {
  Box,
  Button,
  IconButton,
  Table,
  Typography,
  Avatar,
  Tag,
  ColumnButton,
  Select,
  Modal,
  Image,
} from '../..';
import { BiSearch } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PromotionalCard from '../../molecules/PromotionalCard/PromotionalCard';
import Profile from '../../../assets/user.svg';

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
import { getCollaboratorFail, getAllUsers, clearFeedback } from '../../../store/modules/collaborator/actions';
import { GridBtnFull, GridBtnLeft, GridBtnRight, ModalGrid } from '../Dashboard/Dashboard.styled';

import ModalSuccess from '../../../assets/ModalSuccess.svg';

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
      title: '',
      dataIndex: 'name',
      key: 'photo',
      render: (value) => (
        <Box params={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {value != '' && value != undefined ? <Avatar image={value} /> : <Avatar image={Profile} />}
          {console.error('img', value)}
        </Box>
      ),
    },
    {
      title: t('table.headers.worker'),
      dataIndex: 'name',
      key: 'name',
      render: (value) => (
        <Box params={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
      render: (value, object) => (
        <>
          {object.password == '' &&
            <Tag size="large" color="warning">
              Pendente
            </Tag>
          }
          {object.password != '' &&
            <Tag size="large" color={value == true ? 'success' : 'default'}>
              {value == true ? 'Ativo': 'Inativo'}
            </Tag>
          }
        </>
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

  const { feedback } = useSelector((state: RootState) => state.collaborator)
  const [ isModalOpen2, setModalOpen2 ] = useState(feedback.status == 'success' ? true : false);


  const onClose2 = () => dispatch(clearFeedback())
  
  //users.filter((u) => u.name)
  let [ iteracaoDados, setIteracaoDados ] = useState(users.filter((u) => u._id))  
  let [ iteracaoStatus, setIteracaoStatus ] = useState(true)

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

    

    if(iteracaoStatus == false){
      switch(selecionaTipo?.label){
        case 'Todos':
          setIteracaoDados(users.filter((u) => u.name))
          setIteracaoStatus(false)
          console.log('Selecionado: Todos')
        break;
        case 'Ativo':
          setIteracaoDados(users.filter((u) => u.active == true))
          console.log('Selecionado: Ativo')
          setIteracaoStatus(false)
        break;
        case 'Pendente':
          setIteracaoDados(users.filter((u) => u.password_hash == ''))
          console.log('Selecionado: Pendente')
          setIteracaoStatus(false)
        break;
        case 'Inativo':
          setIteracaoDados(users.filter((u) => u.active == false))
          console.log('Selecionado: Inativo')
          setIteracaoStatus(false)
        break;
        default:
          setIteracaoDados(users.filter((u) => u.name))
          console.log('Selecionado: Todos')
          setIteracaoStatus(false)
        break;
      }
    }
    else {
      
      setIteracaoDados(users.filter((u) => u.name))
      setIteracaoStatus(false)
    }
 

    if(isConcluded == true){
      console.warn('carregar', isConcluded  ? 'Carregar' : 'Não carregar')
      dispatch(getAllUsers())
      dispatch(getCollaboratorFail())
    }

    console.error('usr', users)

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
              items={iteracaoDados == [] ? users.filter((u) => u.name) : iteracaoDados}
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
