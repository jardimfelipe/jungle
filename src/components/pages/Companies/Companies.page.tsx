<<<<<<< HEAD
import React, { useEffect } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { Box, IconButton, Typography, CompanyTable } from '../..';
=======
import React, { useEffect ,useState} from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { Select, Box, IconButton, Typography, CompanyTable, Button, ColumnButton, Modal, Textfield, Label, FileUploader, ImageUploader } from '../..';
>>>>>>> origin/jungle-collaborator
import { BiSearch } from 'react-icons/bi';
import { BiBuildings, BiDockLeft } from 'react-icons/bi';
import PromotionalCard from '../../molecules/PromotionalCard/PromotionalCard';
import { FilterLink } from './Companies.styled';
import Resume from '../../molecules/Resume/Resume';

import { useHistory } from 'react-router-dom';

import { useTheme } from 'styled-components';
import { CompanyItem, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionariesRequest } from '../../../store/modules/questionaries/actions';
<<<<<<< HEAD
=======
import axios from 'axios';

import paises from './paises.json';
>>>>>>> origin/jungle-collaborator

const { Title } = Typography;

const Companies: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { companies } = useSelector(({ companies }: RootState) => companies);
  const { questionaries } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );

  const resumeItems = [
    {
      name: 'Empresas',
      icon: <BiBuildings size="32" color={theme.colors.blue} />,
      total: companies.length,
    },
    {
      name: 'Questionários',
      icon: <BiDockLeft size="32" color="#3BC8E3" />,
      total: questionaries.length,
    },
    {
      name: 'Ativos',
      icon: <BiDockLeft size="32" color={theme.colors.p3} />,
      total: questionaries.filter(({ active }) => active).length,
    },
    {
      name: 'Inativos',
      icon: <BiDockLeft size="32" color={theme.colors.p1} />,
      total: questionaries.filter(({ active }) => !active).length,
    },
  ];

  const handleTableClick = (company: CompanyItem) => {
    history.push({
      pathname: `/companies/company/${company.id}`,
      state: { company },
    });
  };

<<<<<<< HEAD
  useEffect(() => {
    dispatch(getQuestionariesRequest());
  }, [dispatch]);
=======


  

  let [ isOpenModal1, setOpenModal1 ] = useState(false)
  const onClose1 = () => setOpenModal1(!isOpenModal1)

  let [ setor, setSetor ] = useState([
  {label: "Aeroespacial", value: "Aeroespacial"},
  {label: "Serviços para a Terceira Idade", value:"Serviços para a Terceira Idade" }, 
  {label: "Agricultura, Pesca e derivados", value: "Agricultura, Pesca e derivados" },
  {label: "Biotecnologia & Farmacêutico", value: "Biotecnologia & Farmacêutico" },
  {label: "Construção", value: "Construção" },
  {label: "Educação & Formação", value: "Educação & Formação" }, 
  {label: "Eletrônica", value: "Eletrônica" },
  {label: "Engenharia", value: "Engenharia" },
  {label: "Entertenimento", value: "Entertenimento" },
  {label: "Serviços Financeiros & Seguros", value: "Serviços Financeiros & Seguros" }, 
  {label: "Saúde", value: "Saúde" },
  {label: "Hotelaria & Turismos", value: "Hotelaria & Turismos" }, 
  {label: "Atividades Industriais", value: "Atividades Industriais" },
  {label: "Tecnologias da Informação", value: "Tecnologias da Informação" },
  {label: "Transformação & Produção", value: "Transformação & Produção" },
  {label: "Mídia ", value: "Mídia " },
  {label: "Mineração & Extração", value: "Mineração & Extração" }, 
  {label: "Serviços Profissionais", value: "Serviços Profissionais" },
  {label: "Gestão Imobiliária", value: "Gestão Imobiliária" },
  {label: "Comércio & Varejo", value: "Comércio & Varejo" },
  {label: "Serviços Sociais e Agências Governamentais", value: "Serviços Sociais e Agências Governamentais"}, 
  {label: "Telecomunicações", value: "Telecomunicações" },
  {label: "Transportes & Logística", value: "Transportes & Logística" },
  {label: "Outros", value: "Outros" },

  ])
  

  useEffect(() => {
    dispatch(getQuestionariesRequest());

  }, [dispatch, paises]);

>>>>>>> origin/jungle-collaborator

  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title="Olá equipe Jungle!"
        text="Aqui você tem acesso a todas as empresas que participam de nossas jornadas e pode acompanhar o status dos projetos e o engajamento dos colaboradores."
      />

      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3}>Empresas</Title>
        <Box
<<<<<<< HEAD
          params={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}
=======
          params={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', alignItems: 'center'}}
>>>>>>> origin/jungle-collaborator
        >
          <IconButton icon={<BiSearch />} />
          <FilterLink isActive={true}>Ativas</FilterLink>
          <FilterLink isActive={false}>Inativas</FilterLink>
<<<<<<< HEAD
=======
          <div style={{width: "256px", height: "40px"}}> <Button block size="small"  variant="primary" onClick={onClose1}> Cadastrar Dimensões </Button> </div>
>>>>>>> origin/jungle-collaborator
        </Box>
      </Box>

      <Row>
        <Col xs>
          <Resume items={resumeItems} />
        </Col>
      </Row>

      <CompanyTable onClick={handleTableClick} />
<<<<<<< HEAD
=======

      <Modal width={1073} height={752}  isOpen={isOpenModal1} onClose={onClose1}>
        <form>
          <Box params={{ display: 'flex', flexDirection: 'row', marginLeft: '64px'}}>
            <Box params={{ display: 'flex', flexDirection: 'column', width: '443px'}}>
              <Label>Logotipo da empresa</Label>
              <ImageUploader onChange={()=>{}}  />

              <div style={{marginTop: '32px'}}>
                <Label>Razão social</Label>
                <Textfield placeholder="Digite a razão social" />
              </div>

              <div style={{marginTop: '32px'}}>
                <Label>Nome do Gestor</Label>
                <Textfield placeholder="Digite o nome do gestor" />
              </div>
              
              

            </Box>
            <Box params={{ display: 'flex', flexDirection: 'column', width: '443px', marginLeft: '32px'}}>
              <Label>País</Label>
              <Select
                options={paises} 
              />

              <div style={{marginTop: '32px'}}>
                <Label>CNPJ</Label>
                <Textfield placeholder="Digite o CNPJ" />
              </div>
              
              <div style={{marginTop: '32px'}}>
                <Label>E-mail do gestor</Label>
                <Textfield placeholder="Digite o e-mail do gestor" />
              </div>
              
              <div style={{marginTop: '32px'}}>
                <Label>Setor</Label>
                <Select options={setor} />
              </div>
              
            </Box>
          </Box>
        </form>
      </Modal>
>>>>>>> origin/jungle-collaborator
    </Box>
  );
};

export default Companies;
