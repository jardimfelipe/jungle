import { Box, Avatar, Tag } from '../..';
import { Field } from '../../molecules/Table/table.types';
import Profile from '../../../assets/profile.jpg';

export const tableFields: Field[] = [
  {
    title: 'Colaborador',
    dataIndex: 'worker',
    key: 'worker',
    render: (value) => (
      <Box params={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Avatar image={Profile} />
        {value}
      </Box>
    ),
  },
  {
    title: 'Setor',
    dataIndex: 'sector',
    key: 'sector',
  },
  {
    title: 'Função',
    dataIndex: 'function',
    key: 'function',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Colaborador',
    dataIndex: 'worker',
    key: 'worker',
    render: (value) => (
      <Tag size="large" color="success">
        {value ? 'ativo' : 'inativo'}
      </Tag>
    ),
  },
];

export const tableData = [
  {
    worker: 'Jane Doe',
    sector: 'Financeiro',
    function: 'Contadora',
    email: 'jane@doe.com',
    phone: '21 9999-9999',
    status: true,
  },
  {
    worker: 'Jane Doe',
    sector: 'Financeiro',
    function: 'Contadora',
    email: 'jane@doe.com',
    phone: '21 9999-9999',
    status: true,
  },
  {
    worker: 'Jane Doe',
    sector: 'Financeiro',
    function: 'Contadora',
    email: 'jane@doe.com',
    phone: '21 9999-9999',
    status: true,
  },
  {
    worker: 'Jane Doe',
    sector: 'Financeiro',
    function: 'Contadora',
    email: 'jane@doe.com',
    phone: '21 9999-9999',
    status: true,
  },
  {
    worker: 'Jane Doe',
    sector: 'Financeiro',
    function: 'Contadora',
    email: 'jane@doe.com',
    phone: '21 9999-9999',
    status: true,
  },
  {
    worker: 'Jane Doe',
    sector: 'Financeiro',
    function: 'Contadora',
    email: 'jane@doe.com',
    phone: '21 9999-9999',
    status: true,
  },
];
