import React from 'react';

import { useTheme } from 'styled-components';

import { Box, Modal, Typography, Label, Select, Textfield } from '../../..';
import { Col, Row } from 'react-flexbox-grid';
import { BiCalendar } from 'react-icons/bi';

import { ModalProps } from '../../../molecules/Modal/Modal.types';
import { ModalButton } from '../../Dashboard/Dashboard.styled';

const { Title, Text } = Typography;

const InsertQuestionary: React.FC<ModalProps> = ({ onClose, isOpen }) => {
  const theme = useTheme();
  return (
    <Modal width={480} height={530} isOpen={isOpen} onClose={onClose}>
      <Box
        params={{
          padding: '0 42px 25px 42px',
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        <Title variant="primary" level={3}>
          Selecione o questionário e período de rastreio
        </Title>

        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue
          non lectus nec blandit. Fusce vestibulum nunc et elit lacinia
          volutpat. Sed vel fermentum justo.
        </Text>
        <div>
          <Label>Questionário</Label>
          <Select
            // onChange={(selectedOption: OptionType | null) =>
            //   handleChange('dimension', selectedOption?.value)
            // }
            placeholder="Selecione"
            options={[]}
          />
        </div>

        <Row>
          <Col xs={12} md={5}>
            <Label>Início</Label>
            <Textfield suffix={<BiCalendar color={theme.colors.darkGray} />} />
          </Col>
          <Col xs={12} md={5}>
            <Label>Fim</Label>
            <Textfield suffix={<BiCalendar color={theme.colors.darkGray} />} />
          </Col>
        </Row>
      </Box>
      <ModalButton variant="primary">Selecionar questionário</ModalButton>
    </Modal>
  );
};

export default InsertQuestionary;
