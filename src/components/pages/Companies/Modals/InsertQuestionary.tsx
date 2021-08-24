import React, { useState, useEffect } from 'react';

import { useTheme } from 'styled-components';

import { Box, Modal, Typography, Label, Select, Textfield } from '../../..';
import { ErrorMessage } from '../../../atoms/Textfield/Textfield.styled';
import { Col, Row } from 'react-flexbox-grid';
import { BiCalendar } from 'react-icons/bi';
import { Oval } from 'react-loading-icons';

import { ModalProps } from '../../../molecules/Modal/Modal.types';
import { ModalButton } from '../../Dashboard/Dashboard.styled';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyItem, RootState } from '../../../../store';
import { OptionType } from '../../../atoms/Select/Select.types';
import {
  insertQuestionaryRequest,
  resetFeeback,
} from '../../../../store/modules/companies/actions';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import schema from './schema';
import formatStringData from '../../../../utils/formatDate';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';

const { Title } = Typography;
type RouteState = {
  company: CompanyItem;
};

const InsertQuestionary: React.FC<ModalProps> = ({ onClose, isOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    state: { company: routeCompany },
  } = useLocation<RouteState>();
  const [questionarieOptions, setQuestionarieOptions] = useState<OptionType[]>(
    []
  );
  const { questionaries } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );
  const { isLoading, questionaryFeedback } = useSelector(
    ({ companies }: RootState) => companies
  );

  const formik = useFormik({
    initialValues: {
      questionnaire: '',
      start: '',
      end: '',
    },
    onSubmit: (values) => {
      const model = {
        company: routeCompany.id,
        questionnaire: values.questionnaire,
        start: formatStringData(values.start),
        end: formatStringData(values.end),
      };
      dispatch(insertQuestionaryRequest(model));
    },
    validateOnChange: false,
    validationSchema: schema,
  });

  const handleClose = () => {
    dispatch(resetFeeback());
    onClose && onClose();
  };

  useEffect(() => {
    dispatch(getQuestionariesRequest());
  }, [dispatch]);

  useEffect(() => {
    const questionariesOptionsLocal = questionaries.map(({ _id, title }) => ({
      value: _id,
      label: title,
    }));
    setQuestionarieOptions(questionariesOptionsLocal);
  }, [questionaries]);

  return (
    <Modal width={480} height={500} isOpen={isOpen} onClose={handleClose}>
      {questionaryFeedback.status === 'success' ? (
        <Box params={{ display: 'block', textAlign: 'center' }}>
          <Title level={3}>{questionaryFeedback.message}</Title>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit}>
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
            <div>
              <Label>Questionário</Label>
              <Select
                onChange={(selectedOption: OptionType | null) =>
                  formik.setFieldValue('questionnaire', selectedOption?.value)
                }
                placeholder="Selecione"
                options={questionarieOptions}
              />
              {formik.errors.questionnaire && (
                <ErrorMessage position="relative">
                  {formik.errors.questionnaire}
                </ErrorMessage>
              )}
            </div>

            <Row>
              <Col xs={12} md={5}>
                <Label>Início</Label>
                <Textfield
                  value={formik.values.start}
                  onChange={formik.handleChange}
                  name="start"
                  id="start"
                  suffix={<BiCalendar color={theme.colors.darkGray} />}
                  error={
                    !!formik.errors.start ? formik.errors.start : undefined
                  }
                />
              </Col>
              <Col xs={12} md={5}>
                <Label>Fim</Label>
                <Textfield
                  value={formik.values.end}
                  onChange={formik.handleChange}
                  name="end"
                  id="end"
                  suffix={<BiCalendar color={theme.colors.darkGray} />}
                  error={!!formik.errors.end ? formik.errors.end : undefined}
                />
              </Col>
            </Row>
          </Box>
          <ModalButton disabled={isLoading} variant="primary">
            {isLoading ? <Oval height="28" /> : 'Selecionar questionário'}
          </ModalButton>
        </form>
      )}
    </Modal>
  );
};

export default InsertQuestionary;
