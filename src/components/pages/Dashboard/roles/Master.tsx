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

export type Resume = {
  name: string;
  total: number | string;
  icon: ReactNode;
};

const { Text, Title } = Typography;

const Master: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { dimensions, isLoading: isResumeLoading } = useSelector(
    (state: RootState) => state.dimensions
  );

  const handleTableClick = (e: CompanyItem) => {
    history.push(`/companies/company/${e.id}`);
  };

  const handleSeeAllClick = () => {
    history.push('/companies');
  };

  const handleResultClick = () => {
    history.push('/dimensions');
  };

  useEffect(() => {
    dispatch(getDimensionsRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />
      <Title level={3}>Resumo da plataforma</Title>
      <ResumeBox>
        {dimensions.map((dimension, index) =>
          isResumeLoading ? (
            <Box
              key={`skeleton-results-${index}`}
              params={{ display: 'block', width: '100%' }}
            >
              <Skeleton height={150} />
            </Box>
          ) : (
            <ResumeCard
              key={`results-${index}`}
              name={dimension.name}
              icon={<Brain color="#ffffff" />}
              total={80}
              onClick={handleResultClick}
            />
          )
        )}
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
