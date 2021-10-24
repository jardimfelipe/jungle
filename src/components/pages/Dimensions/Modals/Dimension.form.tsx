import React, { useEffect } from 'react';

import { Box, Modal, Typography, Textfield, Label } from '../../..';
import { ModalButton } from '../../../pages/Dashboard/Dashboard.styled';
import { Col, Row } from 'react-flexbox-grid';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useTheme } from 'styled-components';
import { SliderContainer } from '../DImensions.styled';
 
import { useFormik } from 'formik';
import schema from './schema';
import { ErrorMessage } from '../../../atoms/Textfield/Textfield.styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { createDimensionsRequest } from '../../../../store/modules/dimensions/actions';

const { Title, Text } = Typography;

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
  const dispatch = useDispatch();
  const { feedback } = useSelector(({ dimensions }: RootState) => dimensions);

  const formik = useFormik({
    initialValues: {
      name: '',
      qt_minimum: 0,
      qt_maximum: 0,
      mandatory: 0,
      complementary: 0,
      optional: 0,
    },
    onSubmit: (values) => {
      dispatch(createDimensionsRequest(values));
    },
    validateOnChange: false,
    validationSchema: schema,
  });

  useEffect(() => {
    if (feedback.status === 'success') onClose();
  }, [feedback, onClose]);
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
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={!!formik.errors.name ? formik.errors.name : undefined}
                />
              </Box>
            </Col>

            <Col xs={12} md={6}>
              <Label>Questões (mínima)</Label>
              <Textfield
                name="qt_minimum"
                value={formik.values.qt_minimum}
                onChange={formik.handleChange}
                error={
                  !!formik.errors.qt_minimum
                    ? formik.errors.qt_minimum
                    : undefined
                }
              />
            </Col>

            <Col xs={12} md={6}>
              <Label>Questões (máxima)</Label>
              <Textfield
                name="qt_maximum"
                value={formik.values.qt_maximum}
                onChange={formik.handleChange}
                error={
                  !!formik.errors.qt_maximum
                    ? formik.errors.qt_maximum
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
                <Box
                  params={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <Text>0</Text>
                  <FormSlider
                    value={formik.values.mandatory}
                    onChange={(value) =>
                      formik.setFieldValue('mandatory', value)
                    }
                   trackStyle={{
                      backgroundColor: theme.colors.p1,
                      height: 8,
                    }}
                    handleStyle={handleSliderStyles}
                    max={formik.values.qt_maximum}
                    railStyle={{
                      backgroundColor: theme.colors.darkGray,
                      height: 8,
                    }}
                  />
                  <Text>{formik.values.qt_maximum}</Text>
                  {!!formik.errors.mandatory && (
                    <ErrorMessage>{formik.errors.mandatory}</ErrorMessage>
                  )}
                </Box>
              </SliderContainer>

              <SliderContainer>
                <Label>Complementares (P2)</Label>
                <Box
                  params={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <Text>0</Text>
                  <FormSlider
                    value={formik.values.complementary}
                    onChange={(value) =>
                      formik.setFieldValue('complementary', value)
                    }
                    trackStyle={{
                      backgroundColor: theme.colors.p2,
                      height: 8,
                    }}
                    maximumTrackStyle={{ backgroundColor: theme.colors.blue }}
                    handleStyle={handleSliderStyles}
                    max={
                      formik.values.qt_maximum > 1
                        ? formik.values.qt_maximum / 2
                        : 0
                    }
                    railStyle={{
                      backgroundColor: theme.colors.darkGray,
                      height: 8,
                    }}
                  />
                  <Text>
                    {formik.values.qt_maximum > 1
                      ? (formik.values.qt_maximum / 2).toFixed(0)
                      : 0}
                  </Text>
                  {!!formik.errors.complementary && (
                    <ErrorMessage>{formik.errors.complementary}</ErrorMessage>
                  )}
                </Box>
              </SliderContainer>

              <SliderContainer>
                <Label>Opcionais (P3)</Label>
                <Box
                  params={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <Text>0</Text>
                  <FormSlider
                    value={formik.values.optional}
                    onChange={(value) =>
                      formik.setFieldValue('optional', value)
                    }
                    trackStyle={{
                      backgroundColor: theme.colors.p3,
                      height: 8,
                    }}
                    handleStyle={handleSliderStyles}
                    max={
                      formik.values.qt_maximum > 1
                        ? formik.values.qt_maximum -
                          formik.values.mandatory -
                          formik.values.complementary
                        : 0
                    }
                    railStyle={{
                      backgroundColor: theme.colors.darkGray,
                      height: 8,
                    }}
                  />
                  <Text>
                    {formik.values.qt_maximum > 1
                      ? formik.values.qt_maximum -
                        formik.values.mandatory -
                        formik.values.complementary
                      : 0}
                  </Text>
                </Box>
                {!!formik.errors.optional && (
                  <ErrorMessage>{formik.errors.optional}</ErrorMessage>
                )}
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
