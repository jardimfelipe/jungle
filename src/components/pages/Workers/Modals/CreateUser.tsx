import React, { useCallback, useEffect, useState } from 'react';

import { Row, Col } from 'react-flexbox-grid';
import { Box, Modal, Typography, FileUploader, Textfield, Select, Button } from '../../..';
import { ModalButton } from '../../../pages/Dashboard/Dashboard.styled';
import ProgressBar from '@ramonak/react-progress-bar';
import { Oval } from 'react-loading-icons';

import { createUsersRequest } from '../../../../store/modules/users/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';

import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { FaCheckCircle } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;



type ModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
};

const CreateUser: React.FC<ModalProps> = ({ onClose, isModalOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t }  = useTranslation();
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



  function setLista(nome: string){
     let lista = [];
     if(nome == 'name'){
       lista.push(`${t('registerCollaborator.name.label')}`)
       lista.push(`${t('registerCollaborator.name.placeholder')}`)
     }
     if(nome == 'email'){
       lista.push(`${t('registerCollaborator.email.label')}`)
       lista.push(`${t('registerCollaborator.email.placeholder')}`)
     }
     if(nome == 'emailGestor'){
       lista.push(`${t('registerCollaborator.emailGestor.label')}`)
       lista.push(`${t('registerCollaborator.emailGestor.placeholder')}`)
     }
     if(nome == 'unityOrLocalization'){
       lista.push(`${t('registerCollaborator.unityOrLocalization.label')}`)
       lista.push(`${t('registerCollaborator.unityOrLocalization.placeholder')}`)     
     }
     if(nome == 'positions'){
       lista.push(`${t('registerCollaborator.positions.label')}`) 
       lista.push(`${t('registerCollaborator.positions.default')}`) 
       for (var i = 0; i < 11; i++) {
         let valor = `${t('registerCollaborator.positions.select.'+i+'.value')}`
         let texto = `${t('registerCollaborator.positions.select.'+i+'.label')}`

         lista.push({value: valor, label: texto})
       }
     }
     if(nome == 'typeOfPositions'){
      lista.push(`${t('registerCollaborator.typeOfPositions.label')}`) 
       lista.push(`${t('registerCollaborator.typeOfPositions.default')}`) 
       for (var i = 0; i < 5; i++) {
         let valor = `${t('registerCollaborator.typeOfPositions.select.'+i+'.value')}`
         let texto = `${t('registerCollaborator.typeOfPositions.select.'+i+'.label')}`

         lista.push({value: valor, label: texto})
       }
     }
     if(nome == 'peopleLeader'){
       lista.push(`${t('registerCollaborator.peopleLeader.label')}`) 
       lista.push(`${t('registerCollaborator.peopleLeader.default')}`) 
       for (var i = 0; i < 2; i++) {
         let valor = `${t('registerCollaborator.peopleLeader.select.'+i+'.value')}`
         let texto = `${t('registerCollaborator.peopleLeader.select.'+i+'.label')}`

         lista.push({value: valor, label: texto})
       }
     }
     if(nome == 'areaOrDepartmentOrDirectory'){
       lista.push(`${t('registerCollaborator.areaOrDepartmentOrDirectory.label')}`) 
       lista.push(`${t('registerCollaborator.areaOrDepartmentOrDirectory.default')}`) 
       for (var i = 0; i < 11; i++) {
         let valor = `${t('registerCollaborator.areaOrDepartmentOrDirectory.select.'+i+'.value')}`
         let texto = `${t('registerCollaborator.areaOrDepartmentOrDirectory.select.'+i+'.label')}`

         lista.push({value: valor, label: texto})
       }
     }
     return lista;
  }
  
  const [ name, setName ] = useState<Object[]>(setLista('name'));
  const [ email, setEmail ] = useState<Object[]>(setLista('email'));
  const [ unityOrLocalization, setUnityOrLocalization ] = useState<Object[]>(setLista('unityOrLocalization'));
  const [ positions, setpositions ] = useState<Object[]>(setLista('positions'));
  const [ typeOfPositions, setTypeOfPositions ] = useState<Object[]>(setLista('typeOfPositions'));
  const [ peopleLeader, setPeopleLeader ] = useState<Object[]>(setLista('peopleLeader'));
  const [ areaOrDepartamentOrDirectory, setAreaOrDepartamentOrDirectory ] = useState<Object[]>(setLista('areaOrDepartmentOrDirectory'));
  const [ emailGestor, setEmailGestor ] = useState<Object[]>(setLista('emailGestor'));

  function setSublista(name: string){
    let lista = [];
    let sublista = null;
    if(name == 'positions'){sublista=positions}
    if(name == 'typeOfPositions'){sublista=typeOfPositions}
    if(name == 'peopleLeader'){sublista=peopleLeader}
    if(name == 'areaOrDepartmentOrDirectory'){sublista=areaOrDepartamentOrDirectory}
    if(sublista != null){
      for(let i = 0; i < sublista.length ; i++){
        if(i > 1 ){
          lista.push(sublista[i])
        }
      }
    }
    return lista;
  }

  const [ positionsList, setpositionsList ] = useState<Object[]>(setSublista('positions'));
  const [ typeOfPositionsList, setTypeOfPositionsList ] = useState<Object[]>(setSublista('typeOfPositions'));
  const [ peopleLeaderList, setPeopleLeaderList ] = useState<Object[]>(setSublista('peopleLeader'));
  const [ areaOrDepartamentOrDirectoryList, setAreaOrDepartamentOrDirectoryList ] = useState<Object[]>(setSublista('areaOrDepartmentOrDirectory'));
 

   useEffect(()=>{
     console.log(positionsList, typeOfPositionsList, peopleLeaderList, areaOrDepartamentOrDirectoryList)
   })

  return (
    <Modal width={800} height={600} isOpen={isModalOpen} onClose={onClose}>

      <Box 
        params={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }} >

        <Box  params={{padding: '10px'}}>
          <Title level={1}>{`${t('registerCollaborator.title')}`}</Title>
          <Text paragraph>{`${t('registerCollaborator.subtitle')}`}</Text>
        </Box>

        <Box params={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
          width: '100%',
        }}>
          <Row>
            <Col md={6}>
              <Textfield label={name[0].toString()} placeholder={name[1].toString()} />
            </Col>
            <Col md={6}>
              <Textfield type="email" label={email[0].toString()} placeholder={email[1].toString()} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Textfield label={unityOrLocalization[0].toString()} placeholder={unityOrLocalization[1].toString()} />
            </Col>
            <Col md={6}>
              <Box params={{ marginBottom: '9px' }}>
                <label>{typeOfPositions[0].toString()}</label>
              </Box>
              
              <Select 
                options={typeOfPositionsList}
                placeholder={typeOfPositions[1].toString()}
                />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Box params={{ marginBottom: '9px' }}>
                <label>{positions[0].toString()}</label>
              </Box>
              
              <Select 
                options={positionsList}
                placeholder={positions[1].toString()}
                />
            </Col>
             <Col md={6}>
              <Box params={{ marginBottom: '9px' }}>
                <label>{areaOrDepartamentOrDirectory[0].toString()}</label>
              </Box>
              
              <Select 
                options={areaOrDepartamentOrDirectoryList}
                placeholder={areaOrDepartamentOrDirectory[1].toString()}
                />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Box params={{ marginBottom: '9px' }}>
                <label>{peopleLeader[0].toString()}</label>
              </Box>
              
              <Select 
                options={peopleLeaderList}
                placeholder={peopleLeader[1].toString()}
                />
            </Col>

            <Col md={6}>
              <Textfield label={emailGestor[0].toString()} placeholder={emailGestor[1].toString()} />                        
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Button variant="cancel" block onClick={onClose}>
                {`${t('registerCollaborator.buttonCancel')}`}
              </Button>
            </Col>
            <Col md={6}>
              <Button variant="primary" block>
                {`${t('registerCollaborator.buttonAdd')}`}
              </Button>
            </Col>
          </Row>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateUser;
