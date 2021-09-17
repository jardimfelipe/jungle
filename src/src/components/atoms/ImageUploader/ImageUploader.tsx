import React, { useCallback, useEffect, useState } from 'react';
import { DropContainer } from '../FileUploader/FileUploader.styled';

import { ImageUploaderProps } from './ImageUploader.types';
import { Box, Typography } from '../..';
import { IoImageOutline } from 'react-icons/io5';
import { ChangeButton, Preview } from './ImageUploader.styled';

import { useTheme } from 'styled-components';
import { useDropzone } from 'react-dropzone';

const { Text } = Typography;

interface ImageState extends File {
  preview: string;
} 

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [files, setFiles] = useState<ImageState[]>([]);
  const theme = useTheme();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: ['.png', '.jpg', '.svg'],
    onDrop,
  });

  const handleRemoveFile = () => {
    setFiles([]);
  };

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

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
            <IoImageOutline
              style={{ flexShrink: 0 }}
              color={theme.colors.darkGray}
              size={65}
            />
            <Text>Enviar uma foto de capa</Text>
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
      {!files.length ? (
        <DropContainer {...getRootProps()}>
          <input {...getInputProps()} id="file-uploader" type="file" />
          {renderDragMessage()}
        </DropContainer>
      ) : (
        <Preview image={files[0].preview}>
          <ChangeButton onClick={handleRemoveFile}>Alterar</ChangeButton>
        </Preview>
      )}
    </Box>
  );
};

export default ImageUploader;
