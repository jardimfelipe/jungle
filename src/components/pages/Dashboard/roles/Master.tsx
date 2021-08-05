import React, { ReactNode, useEffect } from 'react';

import {
  Typography,
  Box,
  PromotionalCard,
  NavigationButton,
  ResumeCard,
} from '../../../';
import { ResumeBox } from '../Dashboard.styled';
import Skeleton from 'react-loading-skeleton';
import Brain from '../../../atoms/Icons/Brain.icon';
import { BsArrowRight } from 'react-icons/bs';
import CompanyTable from '../../../organisms/CompanyTable/CompanyTable';

import { getDimensionsRequest } from '../../../../store/modules/dimensions/actions';
import { useHistory } from 'react-router-dom';
import { CompanyItem, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getResultsRequest } from '../../../../store/modules/results/actions';

export type Resume = {
  name: string;
  total: number | string;
  icon: ReactNode;
};

const { Text, Title } = Typography;

const names = [
  { name: 'Empresas', total: 1 },
  { name: 'Dimensões', total: 12 },
  { name: 'Perguntas', total: 1 },
  { name: 'Questionários', total: 1 },
];

const Master: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading: isResumeLoading } = useSelector(
    (state: RootState) => state.dimensions
  );

  const handleTableClick = (company: CompanyItem) => {
    history.push({
      pathname: `/companies/company/${company.id}`,
      state: { company },
    });
  };

  const handleSeeAllClick = () => {
    history.push('/companies');
  };

  const handleResultClick = () => {
    history.push('/dimensions');
  };

  useEffect(() => {
    dispatch(getDimensionsRequest());
    dispatch(getResultsRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />
      <Title level={3}>Resumo da plataforma</Title>
      <ResumeBox role="admin_jungle">
        {isResumeLoading
          ? [...Array(6)].map((_, index) => (
              <Box
                key={`skeleton-results-${index}`}
                params={{ display: 'block', width: '100%' }}
              >
                <Skeleton height={150} />
              </Box>
            ))
          : names.map((item, index) => (
              <ResumeCard
                key={`results-${index}`}
                name={item.name}
                icon={<Brain color="#ffffff" />}
                total={item.total}
                onClick={handleResultClick}
              />
            ))}
      </ResumeBox>
      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3}>Últimas empresas cadastradas</Title>
        <NavigationButton onClick={handleSeeAllClick}>
          <Text> Exibir todas</Text> <BsArrowRight />
        </NavigationButton>
      </Box>
      <CompanyTable hideHeader onClick={handleTableClick} />
    </Box>
  );
};

export default Master;
