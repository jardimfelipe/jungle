import React from 'react';
import { DropContainer, FileInfo } from './FileUploader.styled';

import { useDropzone } from 'react-dropzone';
import { FileUploaderProps } from './FileUploader.types';
import { Box, Typography, Button } from '../..';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { CgCloseR } from 'react-icons/cg';

import { useTheme } from 'styled-components';

const { Text } = Typography;

const FileUploader: React.FC<FileUploaderProps> = ({ onDrop }) => {
  const theme = useTheme();
  const { getRootProps, getInputProps, isDragReject, acceptedFiles } =
    useDropzone({
      accept: ['xls', 'xlsx', 'csv'],
      onDrop,
    });

  const files = acceptedFiles.map((file) => (
    <FileInfo key={file.name}>
      {file.name}
      <Button>
        <CgCloseR size={18} color={theme.colors.p1} />
      </Button>
    </FileInfo>
  ));

  const renderDragMessage = () => {
    return (
      <Box
        params={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '25px',
        }}
      >
        {isDragReject ? (
          <Text>Arquivo não suportado</Text>
        ) : (
          <>
            <AiOutlineFileAdd
              style={{ flexShrink: 0 }}
              color={theme.colors.darkGray}
              size="64"
            />
            <Text>
              {!acceptedFiles.length
                ? 'Arraste e solte sua planilha ou clique aqui para acessá-la'
                : 'Substituir planilha'}
            </Text>
          </>
        )}
      </Box>
    );
  };
  return (
    <Box
      params={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        width: '100%',
      }}
    >
      {files}
      <DropContainer {...getRootProps()}>
        <input {...getInputProps()} id="file-uploader" type="file" />
        {renderDragMessage()}
      </DropContainer>
    </Box>
  );
};

export default FileUploader;
