import React, { ReactNode } from 'react';

import { Box, Card, ChartWrapper, TableChart, Typography } from '../..';
import {
  TableContainer,
  TableImage,
} from '../../organisms/CompanyTable/CompanyTable.styled';

const { Text } = Typography;

type Item = {
  name: string;
  icon: ReactNode;
  total: number | string;
};

type ResumeProps = {
  items: Item[];
  date?: string;
  filled?: number;
  company?: {
    image: string;
    name: string;
  };
};

const Resume: React.FC<ResumeProps> = ({ items, date, filled, company }) => {
  const chartData = {
    datasets: [
      {
        label: null,
        data: [70, 30],
        backgroundColor: ['#4ED9A7', '#F1F5FA'],
        borderWidth: 0,
      },
    ],
  };
  return (
    <Card>
      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box params={{ display: 'flex', flexDirection: 'column' }}>
          {company ? (
            <TableContainer>
              <TableImage src={company.image} alt={company.image} />
              <Text textDecoration="strong" variant="primary">
                {company.name}
              </Text>
            </TableContainer>
          ) : (
            <>
              <Text>
                <small>Resumo</small>
              </Text>
              <Text size={24} textDecoration="strong" variant="primary">
                Jungle
              </Text>
            </>
          )}
        </Box>

        <Box params={{ display: 'flex', gap: '24px' }}>
          {items.map((item, index) => (
            <Box
              params={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={`resume-box-${index}`}
            >
              <Box
                params={{ display: 'flex', gap: '5px', alignItems: 'center' }}
              >
                {item.icon}
                <Text size={20} textDecoration="strong">
                  {item.total}
                </Text>
              </Box>
              <Text>{item.name}</Text>
            </Box>
          ))}
        </Box>

        {date && (
          <Box
            params={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Text textDecoration="strong">{date}</Text>
            <Text>ativo desde</Text>
          </Box>
        )}

        {filled && (
          <Box params={{ display: 'flex', alignItems: 'center' }}>
            <ChartWrapper>
              <TableChart data={chartData} />
              <Text textDecoration="strong">{filled}%</Text>
            </ChartWrapper>
            <Text>Preenchimento</Text>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default Resume;
