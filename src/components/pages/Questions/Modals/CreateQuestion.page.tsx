import React, { useEffect, useState } from 'react';

import {
  Box,
  Modal,
  Typography,
  Textfield,
  Label,
  Select,
  RadioButton,
  Button,
} from '../../..';
import { Col, Row } from 'react-flexbox-grid';
import {
  AnswerBox,
  CancelButton,
  InputWrapper,
  OptionMark,
  QuestionTextArea,
  RadioContainer,
} from '../Questions.styled';

import { useTheme } from 'styled-components';
import { AiFillPlusCircle } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import { getDimensionsRequest } from '../../../../store/modules/dimensions/actions';
import { RootState } from '../../../../store';
import { OptionType } from '../../../atoms/Select/Select.types';
import { useFormik } from 'formik';

const { Text } = Typography;

type ModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
};

type QuestionOption = {
  title: string;
};

const weightOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
];

const typeOptions = [{ value: 1, label: 'Escolha' }];

const CreateQuestion: React.FC<ModalProps> = ({ onClose, isModalOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { dimensions } = useSelector(({ dimensions }: RootState) => dimensions);
  const [dimensionOptions, setDimensionOptions] = useState<OptionType[]>([]);
  const [optionTitle, setOptionTitle] = useState('');

  const handleAddOption = () => {
    if (!optionTitle) return;
    const newOption = {
      title: optionTitle,
    };
    formik.setFieldValue('options', [...formik.values.options, newOption]);
    setOptionTitle('');
  };

  const handleOptionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionTitle(e.target.value);
  };

  const handleOptionTitleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOption();
    }
  };

  const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

  const handle = (input: string, value: string) => {
    console.log(input, value);
    formik.setFieldValue(input, value);
  };

  useEffect(() => {
    dispatch(getDimensionsRequest());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      dimension: '',
      priority: '',
      weight: '',
      question: '',
      type: '',
      options: [] as QuestionOption[],
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false,
    // validationSchema: schema,
  });

  useEffect(() => {
    const dimensionOptionsLocal = dimensions.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }));
    setDimensionOptions(dimensionOptionsLocal);
  }, [dimensions]);
  return (
    <Modal width={980} height={830} isOpen={isModalOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <Box params={{ padding: '0 25px' }}>
          <Row>
            <Col xs={12} md={3}>
              <Label>Dimensão</Label>
              <Select
                onChange={(selectedOption: OptionType | null) =>
                  handle('dimension', selectedOption?.value)
                }
                placeholder="Selecione"
                options={dimensionOptions}
              />
            </Col>

            <Col xs={12} md={4}>
              <Box
                params={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}
                onChange={(e: any) => handle('priority', e.target.value)}
              >
                <RadioContainer>
                  <Label>Prioridade</Label>
                  <RadioButton
                    label="P1"
                    name="priority"
                    value="p1"
                    checked={formik.values.priority === 'p1'}
                  />
                </RadioContainer>
                <RadioContainer>
                  <RadioButton
                    label="P2"
                    name="priority"
                    value="p2"
                    checked={formik.values.priority === 'p2'}
                  />
                </RadioContainer>
                <RadioContainer>
                  <RadioButton
                    label="P3"
                    name="priority"
                    value="p3"
                    checked={formik.values.priority === 'p3'}
                  />
                </RadioContainer>
              </Box>
            </Col>

            <Col xs={12} md={1}>
              <Label>Peso</Label>
              <Select placeholder="Selecione" options={weightOptions} />
            </Col>

            <Col xs>
              <Box
                params={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                <Button size="small" variant="primary">
                  Salvar pergunta
                </Button>
                <Button size="small" variant="secondary">
                  Visualizar pergunta
                </Button>
              </Box>
            </Col>
          </Row>
        </Box>
        <Box
          params={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            backgroundColor: theme.colors.gray,
            padding: '25px',
            marginTop: '25px',
          }}
        >
          <InputWrapper>
            <Label>Pergunta</Label>
            <QuestionTextArea />
          </InputWrapper>

          <InputWrapper>
            <Label>Tipo de resposta</Label>
            <Box params={{ maxWidth: '350px' }}>
              <Select placeholder="Selecione" options={typeOptions} />
            </Box>
          </InputWrapper>

          <AnswerBox>
            {formik.values.options.map(({ title }) => (
              <Box
                params={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <OptionMark />
                <Text>{title}</Text>
              </Box>
            ))}
            <Textfield
              placeholder="adicionar opção ou aperte a tecla enter"
              value={optionTitle}
              onChange={handleOptionTitleChange}
              onKeyDown={handleOptionTitleKeyDown}
              prefix={
                <AiFillPlusCircle
                  onClick={handleAddOption}
                  color={theme.colors.blue}
                />
              }
              isTransparent
            ></Textfield>
          </AnswerBox>

          <Box params={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CancelButton block onClick={handleCancelButton}>
              Cancelar
            </CancelButton>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateQuestion;
