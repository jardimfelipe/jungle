import React, { useCallback, useState, useEffect } from 'react';

import { Box, Modal, Typography, FileUploader } from '../../..';
import { ModalButton } from '../../../pages/Dashboard/Dashboard.styled';
import ProgressBar from '@ramonak/react-progress-bar';
import { Oval } from 'react-loading-icons';
import { Row, Col } from 'react-flexbox-grid';

import  { Button, Textfield,  Select } from '../../../';

import { createUsersRequest } from '../../../../store/modules/users/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';

import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { FaCheckCircle } from 'react-icons/fa';

import { OptionType } from '../../../atoms/Select/Select.types';

import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

type ModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
};

const CreateUser: React.FC<ModalProps> = ({ onClose, isModalOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { userFileProgress, isFileLoading, error, fileSuccess } = useSelector(
    (state: RootState) => state.users
  );
  const [currentFile, setCurrentFile] = useState<FormData | undefined>(
    undefined
  );

  const handleFileChange = useCallback((files: File[]) => {
    if (!files.length) return setCurrentFile(undefined);
    const data = new FormData();
    data.append('file', files[0], files[0].name);
    setCurrentFile(data);
  }, []);

  const handleSubmit = () => {
    if (fileSuccess) onClose();
    if (currentFile) dispatch(createUsersRequest(currentFile));
  };
  const successFeedback = () => {
    return (
      <Box
        params={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FaCheckCircle size="120" color={theme.colors.p3} />
        <Title level={2}>Usuários cadastrados com sucesso!</Title>
      </Box>
    );
  };

  const usersFileUploader = () => {
    return (
      <Box
        params={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '25px 32px',
        }}
      >
        <Title style={{ alignSelf: 'flex-start' }} variant="primary" level={4}>
          Cadastrar usuários
        </Title>
        <FileUploader onChange={handleFileChange} />

        {error.status && (
          <Box
            params={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15px',
            }}
          >
            <Text color={theme.colors.p1} textDecoration="strong">
              {error.message}
            </Text>
          </Box>
        )}
      </Box>
    );
  };

  const buttonContent = () => {
    const text = fileSuccess ? 'Fechar' : 'Enviar planilha';
    return isFileLoading ? <Oval height="28" /> : text;
  };

  const [isModalOpen2, setModalOpen2] = useState(false);
  const [isModalOpen3, setModalOpen3] = useState(false);

  const onClose2 = () => {
    console.error('botão clicado')
    setModalOpen2(false);
  }
  const onClose3 = () => {
    setModalOpen3(false);
  }

 const { t }  = useTranslation(); 

  const listaCargos = () => {
    let lista = [];
    for(let i=0;i <= 10;i++){
      let valor = t('registerCollaborator.positions.'+i+'.value')
      let texto = t('registerCollaborator.positions.'+i+'.label')
      let objeto = {value: valor, label: texto}
      lista.push(objeto)
    }
    return lista   
  }
  const listaTipoDeCargos = () => {
    let lista = [];
    for(let i=0;i <= 4;i++){
      let valor = t('registerCollaborator.typeOfPositions.'+i+'.value')
      let texto = t('registerCollaborator.typeOfPositions.'+i+'.label')
      let objeto = {value: valor, label: texto}
      lista.push(objeto)
    }
    return lista
  }

  const listaLideranca = () => {
    let lista = [];
    for(let i=0;i <= 1;i++){
      let valor = t('registerCollaborator.peopleLeader.'+i+'.value')
      let texto = t('registerCollaborator.peopleLeader.'+i+'.label')
      let objeto = {value: valor, label: texto}
      lista.push(objeto)
    }
    return lista
  }

  const listaArea = () => {
    let lista = [];
    for(let i=0;i <= 10;i++){
      let valor = t('registerCollaborator.areaOrDepartmentOrDirectory.'+i+'.value')
      let texto = t('registerCollaborator.areaOrDepartmentOrDirectory.'+i+'.label')
      let objeto = {value: valor, label: texto}
      lista.push(objeto)
    }
    return lista
  }

  const [tipoDeCargoOptions, setTipoDeCargoOptions] = useState<OptionType[]>(listaTipoDeCargos);
  const [cargoOptions, setCargoOptions] = useState<OptionType[]>(listaCargos);
  const [liderOptions, setLiderOptions] = useState<OptionType[]>(listaLideranca);
  const [areaOptions, setAreaOptions] = useState<OptionType[]>(listaArea);


   return (
  <div>



    <Modal width={550} height={500} isOpen={isModalOpen} onClose={onClose}>
        
      <Modal isOpen={isModalOpen2} onClose={onClose2}>
        <Title >
          {`${t('registerCollaborator.title')}`}
        </Title>
      </Modal>

      <Button block variant="primary" onClick={()=> setModalOpen2(true)}>
        Cadastrar manualmente um novo colaborador.
      </Button>

  
      {isFileLoading && (
        <Box
          params={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <ProgressBar
            bgColor={theme.colors.blue}
            height="3px"
            completed={userFileProgress}
            baseBgColor={rgba(theme.colors.blue, 0.1)}
            isLabelVisible={false}
            transitionDuration="0.3s"
          />
        </Box>
      )}

      {fileSuccess ? successFeedback() : usersFileUploader()}

      <ModalButton
        disabled={!currentFile || isFileLoading}
        onClick={handleSubmit}
        variant="primary"
        block
      >
        {buttonContent()}
      </ModalButton>
    </Modal>




  </div>
  );
};

export default CreateUser;
