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
  IconButton,
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
import { AiFillPlusCircle, AiFillCloseCircle } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import { getDimensionsRequest } from '../../../../store/modules/dimensions/actions';
import { RootState } from '../../../../store';
import { OptionType } from '../../../atoms/Select/Select.types';
import { useFormik } from 'formik';
import {
  OptionModel,
  Priorities,
} from '../../../../store/modules/questions/types';
import { createQuestionRequest } from '../../../../store/modules/questions/actions';
import FeedbackModal from './FeedbackModal';
import schema from './schema';
import { ErrorMessage } from '../../../atoms/Textfield/Textfield.styled';

const { Text } = Typography;

type ModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
};

const weightOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
];

const typeOptions = [{ value: 'choice', label: 'Escolha' }];

const valueOptions = [...new Array(11)].map((v, i) => ({
  value: i,
  label: i,
}));

const CreateQuestion: React.FC<ModalProps> = ({ onClose, isModalOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { dimensions } = useSelector(({ dimensions }: RootState) => dimensions);
  const [dimensionOptions, setDimensionOptions] = useState<OptionType[]>([]);
  const [optionLabel, setOptionLabel] = useState('');

  const handleAddOption = () => {
    if (!optionLabel) return;
    const newOption = {
      label: optionLabel,
    };
    formik.setFieldValue('options', [...formik.values.options, newOption]);
    setOptionLabel('');
  };

  const handleOptionLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionLabel(e.target.value);
  };

  const handleOptionLabelKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOption();
    }
  };

  const handleOptionValue = (index: number, value: number) => {
    const newOptions = formik.values.options.map((option, optionIndex) => ({
      label: option.label,
      value: index === optionIndex ? value : option.value,
    }));
    formik.setFieldValue('options', newOptions);
  };

  const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formik.resetForm();
    onClose();
  };

  const removeOption = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const removedOptionArray = formik.values.options.filter(
      (_, optionIndex) => optionIndex !== index
    );
    formik.setFieldValue('options', removedOptionArray);
  };

  const handleManualInputChanges = (input: string, value: string) => {
    formik.setFieldValue(input, value);
  };

  useEffect(() => {
    dispatch(getDimensionsRequest());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      dimension: '',
      priority: '' as Priorities,
      weight: 1,
      title: '',
      type: '',
      options: [] as OptionModel[],
    },
    onSubmit: (values) => {
      dispatch(createQuestionRequest(values));
    },
    validateOnChange: false,
    validationSchema: schema,
  });

  useEffect(() => {
    const dimensionOptionsLocal = dimensions.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }));
    setDimensionOptions(dimensionOptionsLocal);
  }, [dimensions]);
  return (
    <Modal width={980} height={840} isOpen={isModalOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <Box params={{ padding: '0 25px' }}>
          <Row>
            <Col xs={12} md={3}>
              <Label>Dimensão</Label>
              <Select
                onChange={(selectedOption: OptionType | null) =>
                  handleManualInputChanges('dimension', selectedOption?.value)
                }
                placeholder="Selecione"
                options={dimensionOptions}
              />
              {!!formik.errors.dimension && (
                <ErrorMessage position="relative">
                  {formik.errors.dimension}
                </ErrorMessage>
              )}
            </Col>

            <Col xs={12} md={4}>
              <Box
                params={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}
                onChange={(e: any) =>
                  handleManualInputChanges('priority', e.target.value)
                }
              >
                <RadioContainer>
                  <Label>Prioridade</Label>
                  <RadioButton
                    label="P1"
                    name="priority"
                    value="p1"
                    checked={formik.values.priority === 'P1'}
                  />
                </RadioContainer>
                <RadioContainer>
                  <RadioButton
                    label="P2"
                    name="priority"
                    value="p2"
                    checked={formik.values.priority === 'P2'}
                  />
                </RadioContainer>
                <RadioContainer>
                  <RadioButton
                    label="P3"
                    name="priority"
                    value="p3"
                    checked={formik.values.priority === 'P3'}
                  />
                </RadioContainer>
              </Box>
              {!!formik.errors.priority && (
                <ErrorMessage position="relative">
                  {formik.errors.priority}
                </ErrorMessage>
              )}
            </Col>

            <Col xs={12} md={1}>
              <Label>Peso</Label>
              <Select
                onChange={(selectedOption: OptionType | null) =>
                  handleManualInputChanges('weight', selectedOption?.value)
                }
                placeholder="Selecione"
                options={weightOptions}
              />
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
            <QuestionTextArea
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {!!formik.errors.title && (
              <ErrorMessage position="relative">
                {formik.errors.title}
              </ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>Tipo de resposta</Label>
            <Box params={{ maxWidth: '350px' }}>
              <Select
                onChange={(selectedOption: OptionType | null) =>
                  handleManualInputChanges('type', selectedOption?.value)
                }
                placeholder="Selecione"
                options={typeOptions}
              />
            </Box>
            {!!formik.errors.type && (
              <ErrorMessage position="relative">
                {formik.errors.type}
              </ErrorMessage>
            )}
          </InputWrapper>

          <AnswerBox>
            {formik.values.options.map(({ label }, index) => (
              <Box
                key={`options-${label}-${Math.random()}`}
                params={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <OptionMark />
                <Text>{label}</Text>
                <Box params={{ flex: '0 0 150px' }}>
                  <Select
                    onChange={(selectedOption: OptionType | null) =>
                      handleOptionValue(index, selectedOption?.value)
                    }
                    value={valueOptions.find(
                      (option) =>
                        +option.value === +formik.values.options[index].value
                    )}
                    placeholder="Selecione"
                    options={valueOptions}
                  />
                </Box>
                <IconButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    removeOption(e, index)
                  }
                  icon={<AiFillCloseCircle />}
                />
              </Box>
            ))}
            <Textfield
              placeholder="adicionar opção ou aperte a tecla enter"
              value={optionLabel}
              onChange={handleOptionLabelChange}
              onKeyDown={handleOptionLabelKeyDown}
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
      <FeedbackModal />
    </Modal>
  );
};

export default CreateQuestion;
