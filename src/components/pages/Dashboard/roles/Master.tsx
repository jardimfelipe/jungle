import React, { ReactNode } from 'react';

import {
  Typography,
  Box,
  // ResumeCard,
  PromotionalCard,
  NavigationButton,
} from '../../../';
// import {
//   BiBuildings,
//   BiPurchaseTag,
//   BiMessageSquareDetail,
//   BiDockLeft,
// } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import CompanyTable from '../../../organisms/CompanyTable/CompanyTable';
import { useHistory } from 'react-router-dom';
import { CompanyItem } from '../../../../store';

export type Resume = {
  name: string;
  total: number | string;
  icon: ReactNode;
};

const { Text, Title } = Typography;

// const resume: Resume[] = [
//   {
//     name: 'Empresas',
//     total: 20,
//     icon: <BiBuildings />,
//   },
//   {
//     name: 'Dimensões',
//     total: 15,
//     icon: <BiPurchaseTag />,
//   },
//   {
//     name: 'Perguntas',
//     total: 400,
//     icon: <BiMessageSquareDetail />,
//   },
//   {
//     name: 'Questionários',
//     total: 200,
//     icon: <BiDockLeft />,
//   },
// ];

const Master: React.FC = () => {
  const history = useHistory();

  const handleTableClick = (e: CompanyItem) => {
    history.push(`/companies/company/${e.id}`);
  };
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />
      <Title level={3}>Resumo da plataforma</Title>
      <Box params={{ display: 'felx', gap: '15px' }}>
        {/* {resume.map((item, index) => (
          <ResumeCard key={`resume-${index}`} item={item} />
        ))} */}
      </Box>
      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3}>Últimas empresas cadastradas</Title>
        <NavigationButton>
          <Text> Exibir todas</Text> <BsArrowRight />
        </NavigationButton>
      </Box>
      <CompanyTable onClick={handleTableClick} />
    </Box>
  );
};

export default Master;
