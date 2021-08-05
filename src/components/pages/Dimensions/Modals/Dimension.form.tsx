import React from 'react';

import { Box, Modal, Typography, Textfield, Label } from '../../..';
import { ModalButton } from '../../../pages/Dashboard/Dashboard.styled';
import { Col, Row } from 'react-flexbox-grid';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useTheme } from 'styled-components';
import { SliderContainer } from '../DImensions.styled';

import { useFormik } from 'formik';
import schema from './schema';

const { Title } = Typography;

type ModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
};

const handleSliderStyles = {
  borderColor: '#ffffff',
  height: 20,
  width: 20,
  backgroundColor: 'black',
};

const FormSlider = createSliderWithTooltip(Slider);

const DimensionForm: React.FC<ModalProps> = ({ onClose, isModalOpen }) => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      dimension: '',
      minQuestions: '',
      maxQuestions: '',
      p1: 0,
      p2: 0,
      p3: 0,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false,
    validationSchema: schema,
  });
  return (
    <Modal width={550} height={680} isOpen={isModalOpen} onClose={onClose}>
      <Box
        params={{
          padding: '0 32px 25px 32px',
        }}
      >
        <Title variant="primary" level={3}>
          Cadastrar dimensão
        </Title>
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col xs={12}>
              <Box params={{ marginBottom: '25px' }}>
                <Label>Dimensão</Label>
                <Textfield
                  name="dimension"
                  value={formik.values.dimension}
                  onChange={formik.handleChange}
                  error={
                    !!formik.errors.dimension
                      ? formik.errors.dimension
                      : undefined
                  }
                />
              </Box>
            </Col>

            <Col xs={12} md={6}>
              <Label>Questões (mínima)</Label>
              <Textfield
                name="minQuestions"
                value={formik.values.minQuestions}
                onChange={formik.handleChange}
                error={
                  !!formik.errors.minQuestions
                    ? formik.errors.minQuestions
                    : undefined
                }
              />
            </Col>

            <Col xs={12} md={6}>
              <Label>Questões (máxima)</Label>
              <Textfield
                name="maxQuestions"
                value={formik.values.maxQuestions}
                onChange={formik.handleChange}
                error={
                  !!formik.errors.maxQuestions
                    ? formik.errors.maxQuestions
                    : undefined
                }
              />
            </Col>

            <Col xs={12}>
              <Title level={4}>Regras por prioridade</Title>
            </Col>

            <Box
              params={{
                display: 'flex',
                flexDirection: 'column',
                gap: '35px',
                width: '100%',
              }}
            >
              <SliderContainer>
                <Label>Obrigatórias (P1)</Label>
                <FormSlider
                  value={formik.values.p1}
                  onChange={(value) => formik.setFieldValue('p1', value)}
                  trackStyle={{ backgroundColor: theme.colors.p1, height: 8 }}
                  handleStyle={handleSliderStyles}
                  railStyle={{
                    backgroundColor: theme.colors.darkGray,
                    height: 8,
                  }}
                />
              </SliderContainer>

              <SliderContainer>
                <Label>Complementares (P2)</Label>
                <FormSlider
                  value={formik.values.p2}
                  onChange={(value) => formik.setFieldValue('p2', value)}
                  trackStyle={{ backgroundColor: theme.colors.p2, height: 8 }}
                  handleStyle={handleSliderStyles}
                  railStyle={{
                    backgroundColor: theme.colors.darkGray,
                    height: 8,
                  }}
                />
              </SliderContainer>

              <SliderContainer>
                <Label>Opcionais (P3)</Label>
                <FormSlider
                  value={formik.values.p3}
                  onChange={(value) => formik.setFieldValue('p3', value)}
                  trackStyle={{ backgroundColor: theme.colors.p3, height: 8 }}
                  handleStyle={handleSliderStyles}
                  railStyle={{
                    backgroundColor: theme.colors.darkGray,
                    height: 8,
                  }}
                />
              </SliderContainer>
            </Box>
          </Row>
          <ModalButton variant="primary" block>
            Cadastrar dimensão
          </ModalButton>
        </form>
      </Box>
    </Modal>
  );
};

export default DimensionForm;
