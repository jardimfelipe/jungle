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
import { getQuestionsRequest } from '../../../../store/modules/questions/actions';

export type Resume = {
  name: string;
  total: number | string;
  icon: ReactNode;
};

const { Text, Title } = Typography;

const Master: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading: isResumeLoading } = useSelector(
    (state: RootState) => state.dimensions
  );
  const { companies } = useSelector(({ companies }: RootState) => companies);
  const { dimensions } = useSelector(({ dimensions }: RootState) => dimensions);
  const { questions } = useSelector(({ questions }: RootState) => questions);
  const names = [
    { name: 'Empresas', total: companies.length, path: '/companies' },
    { name: 'Dimensões', total: dimensions.length, path: '/dimensions' },
    { name: 'Perguntas', total: questions.length, path: '/questions' },
    { name: 'Questionários', total: 1, path: '/questionaries' },
  ];
  const handleTableClick = (company: CompanyItem) => {
    history.push({
      pathname: `/companies/company/${company.id}`,
      state: { company },
    });
  };

  const handleSeeAllClick = () => {
    history.push('/companies');
  };

  useEffect(() => {
    dispatch(getDimensionsRequest());
    dispatch(getQuestionsRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title="Olá equipe Jungle!"
        text="Este é o seu dashboard master. Acompanhe e gerencie as jornadas de nossos clientes."
      />
      <Title level={3}>Resumo da plataforma</Title>
      <ResumeBox role="admin_jungle">
        {isResumeLoading
          ? [...Array(4)].map((_, index) => (
              <Box
                key={`skeleton-results-${index}`}
                params={{ display: 'block', width: '100%' }}
              >
                <Skeleton height={110} />
              </Box>
            ))
          : names.map((item, index) => (
              <ResumeCard
                key={`results-${index}`}
                name={item.name}
                icon={<Brain color="#ffffff" />}
                total={item.total}
                onClick={() => history.push(item.path)}
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
