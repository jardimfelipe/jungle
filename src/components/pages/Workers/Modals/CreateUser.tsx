import React, { useCallback, useEffect, useState } from 'react';

import { Box, Modal, Typography, FileUploader, Button } from '../../..';
import { ModalButton } from '../../../pages/Dashboard/Dashboard.styled';
import ProgressBar from '@ramonak/react-progress-bar';
import { Oval } from 'react-loading-icons';

import {
  createUsersRequest,
  getUsersRequest,
} from '../../../../store/modules/users/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';

import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { FaCheckCircle } from 'react-icons/fa';

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
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const [currentFile, setCurrentFile] = useState<FormData | undefined>(
    undefined
  );
  const [isModalOpen1, setModal1] = useState(false); 
  const [isModalOpen2, setModal2] = useState(false);
  const onClose1 = ()=>setModal1(!isModalOpen1);
  const onClose2 = ()=>setModal2(!isModalOpen2);

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

  useEffect(() => {
    fileSuccess &&
      dispatch(getUsersRequest({ headers: { company: currentUser.company } }));
  }, [fileSuccess, dispatch, currentUser]);

  return (
    <div>

      <Modal width={581} height={455} onClose={onClose} isOpen={isModalOpen}>
        <Box params={{
          width: '443px',
          paddingLeft: '69px',
          paddingRight: '69px',
        }}>
          <Text style={{
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '24px',
            lineHeight: '28px',
            color: '#0062FF'   
          }}> 
            Cadastrar colaborador
          </Text>

          <Button variant="primary" style={{
            width: '443px',
            height: '126px',
            marginTop: '28px',
            marginBottom: '20px'
          }}>
            Cadastrar manualmente um novo colaborador.
          </Button>
          <Button variant="primary" onClick={onClose1} style={{
            width: '443px',
            height: '126px'
          }}>
            Cadastrar múltiplos colaboradores via planilha.
          </Button>
        </Box>
      </Modal>
      <Modal width={550} height={500} isOpen={isModalOpen1} onClose={onClose1}>
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
      <Modal width={550} height={500} isOpen={isModalOpen2} onClose={onClose2}>

      </Modal>
    </div>
  );
};

export default CreateUser;
