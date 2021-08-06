import React, { useEffect, useState } from 'react';

import { Box, Modal, Typography, Textfield, Label, Select } from '../../..';
import { ModalButtonQuestionary } from './CreateQuestion.styled';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { OptionType } from '../../../atoms/Select/Select.types';
import { getDimensionsRequest } from '../../../../store/modules/dimensions/actions';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

type ModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
};

const CreateQuestionary: React.FC<ModalProps> = ({ onClose, isModalOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { dimensions } = useSelector(({ dimensions }: RootState) => dimensions);
  const [dimensionOptions, setDimensionOptions] = useState<OptionType[]>([]);
  const [inputValues, setInputValues] = useState({ dimension: '', title: '' });

  const handleChange = (input: string, value: string) => {
    setInputValues({ ...inputValues, [input]: value });
  };

  const handleManualCreation = () => {
    history.push({
      pathname: `/questionaries/create`,
      state: {
        questionary: {
          title: inputValues.title,
          dimension: dimensions.find(
            ({ _id }) => _id === inputValues.dimension
          ),
        },
      },
    });
  };

  const isFormFilled = () => {
    return !!inputValues.title && !!inputValues.dimension;
  };

  useEffect(() => {
    dispatch(getDimensionsRequest());
  }, [dispatch]);

  useEffect(() => {
    const dimensionOptionsLocal = dimensions.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }));
    setDimensionOptions(dimensionOptionsLocal);
  }, [dimensions]);
  return (
    <Modal width={550} height={450} isOpen={isModalOpen} onClose={onClose}>
      <Box
        params={{
          padding: '0 32px 25px 32px',
        }}
      >
        <Title variant="primary" level={3}>
          Cadastrar questionário
        </Title>
        <Text>
          Antes de iniciar o cadastro do questionário,{' '}
          <strong>selecione uma dimensão e um título para ele.</strong>
        </Text>
        <Box
          params={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginTop: '25px',
          }}
        >
          <div>
            <Label>Dimensão</Label>
            <Select
              onChange={(selectedOption: OptionType | null) =>
                handleChange('dimension', selectedOption?.value)
              }
              placeholder="Selecione"
              options={dimensionOptions}
            />
          </div>

          <div>
            <Label>Título</Label>
            <Textfield
              value={inputValues.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
        </Box>
        <ModalButtonQuestionary disabled={!isFormFilled()} variant="secondary">
          Cadastrar automaticamente
        </ModalButtonQuestionary>
        <ModalButtonQuestionary
          disabled={!isFormFilled()}
          style={{ right: 0, left: 'auto' }}
          onClick={handleManualCreation}
          variant="primary"
        >
          Cadastrar manualmente
        </ModalButtonQuestionary>
      </Box>
    </Modal>
  );
};

export default CreateQuestionary;
