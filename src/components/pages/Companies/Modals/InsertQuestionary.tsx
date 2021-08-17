import React, { useState, useEffect } from 'react';

import { useTheme } from 'styled-components';

import { Box, Modal, Typography, Label, Select, Textfield } from '../../..';
import { Col, Row } from 'react-flexbox-grid';
import { BiCalendar } from 'react-icons/bi';

import { ModalProps } from '../../../molecules/Modal/Modal.types';
import { ModalButton } from '../../Dashboard/Dashboard.styled';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyItem, RootState } from '../../../../store';
import { OptionType } from '../../../atoms/Select/Select.types';
import { insertQuestionaryRequest } from '../../../../store/modules/companies/actions';
import { useLocation } from 'react-router-dom';

const { Title, Text } = Typography;
type RouteState = {
  company: CompanyItem;
};

const InsertQuestionary: React.FC<ModalProps> = ({ onClose, isOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    state: { company: routeCompany },
  } = useLocation<RouteState>();
  const [selectedOption, setSelectedOption] = useState('');
  const [questionarieOptions, setQuestionarieOptions] = useState<OptionType[]>(
    []
  );
  const { company } = useSelector(({ companies }: RootState) => companies);

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleClick = () => {
    const questionary = company.questionaries.find(
      ({ _id }) => _id === selectedOption
    );
    if (!questionary) return;
    const newQuestionary = { ...questionary, company: routeCompany.id };
    dispatch(insertQuestionaryRequest(newQuestionary));
  };

  useEffect(() => {
    const questionariesOptionsLocal = company.questionaries.map(
      ({ _id, title }) => ({
        value: _id,
        label: title,
      })
    );
    setQuestionarieOptions(questionariesOptionsLocal);
  }, [company]);
  console.log(selectedOption);
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
            onChange={(selectedOption: OptionType | null) =>
              handleChange(selectedOption?.value)
            }
            placeholder="Selecione"
            options={questionarieOptions}
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
      <ModalButton
        disabled={!selectedOption}
        onClick={handleClick}
        variant="primary"
      >
        Selecionar questionário
      </ModalButton>
    </Modal>
  );
};

export default InsertQuestionary;
