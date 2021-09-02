import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { Box, Modal, Typography, Checkbox, Button } from '../..';

const { Text, Title } = Typography;


const TermsConditionsModal: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [ opcao1, setOpcao1 ] = useState(false);
  const [ opcao2, setOpcao2 ] = useState(false);
  const [ opcao3, setOpcao3 ] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    console.log(opcao1, opcao2, opcao3)
  })

  console.log(t('termsConditions.introduction'));

  return (
    <Modal
      hasCloseButton={false}
      isOpen={isModalOpen}
      onClose={handleModalClose}
    >
      <Box params={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          params={{
            padding: '20px 25px',
            backgroundColor: theme.colors.blue,
            textAlign: 'center',
          }}
        >
          <Text color="#ffffff" textDecoration="strong">
            {t('termsConditions.header')}
          </Text>
        </Box>

        <Box
          params={{
            padding: '15px 25px',
            backgroundColor: theme.colors.gray,
            overflowY: 'auto',
            maxHeight: '230px',
          }}
        >
          <Text paragraph textAlign="justify">{`${t('termsConditions.introduction.0')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.introduction.1')}`}</Text>

          <Text textDecoration="strong" paragraph>
            {t('termsConditions.introduction.2')}
          </Text>

          <Title level={3}>{t('termsConditions.purpose.title')}</Title>

          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose.text.0')}`}</Text> 
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose.text.1')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose.text.2')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose.text.3')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose.text.4')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose.text.5')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose.text.6')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose.text.7')}`}</Text>

          <Checkbox label={`${t('termsConditions.cb_terms0')}`} checked={opcao1} onChange={()=>{ setOpcao1(!opcao1) }}></Checkbox>

          <Title level={3}>{t('termsConditions.purpose2.title')}</Title>
  
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose2.text.0')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose2.text.1')}`}</Text>
 
          <Title level={3}>{t('termsConditions.purpose3.title')}</Title>
          
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose3.text.0')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose3.text.1')}`}</Text>
          
          <Title level={3}>{`${t('termsConditions.purpose4.title')}`}</Title>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose4.text.0')}`}</Text>
               
          <Title level={3}>{`${t('termsConditions.purpose5.title')}`}</Title>
         
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose5.text.0')}`}</Text>

          <Title level={3}>{`${t('termsConditions.purpose6.title')}`}</Title>
                   
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose6.text.0')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose6.text.1')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose6.text.2')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose6.text.3')}`}</Text> 
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose6.text.4')}`}</Text>
          <Text paragraph textAlign="justify">{`${t('termsConditions.purpose6.text.5')}`}</Text>

          
          <Checkbox label={`${t('termsConditions.cb_terms0')}`}  checked={opcao2} onChange={()=>{
  setOpcao2(!opcao2) }} ></Checkbox>
          
            <Text paragraph textAlign="justify">
              {`${t('termsConditions.end.text.0')}`}
              <Text textDecoration="strong">{`${t('termsConditions.end.text.1')}`}</Text>
              {`${t('termsConditions.end.text.2')}`}
            </Text>
          
          <Box params={{
            display: 'flex'
          }}>

            <Checkbox label={`${t('termsConditions.cb_terms1')}`} checked={opcao3} onChange={()=>{ setOpcao3(!opcao3) }}></Checkbox>
                   
          <Button variant="link" >{`${t('termsConditions.end.link')}`}</Button>

          </Box>
          <Text paragraph textAlign="justify">{`${t('termsConditions.end.text.3')}`}</Text>
        </Box>
        <Box params={{
          paddingTop:  '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Text paragraph>{`${t('termsConditions.end.text.4')}`}</Text>

          <Button variant="primary"  size="small" disabled={
opcao1 && opcao2 && opcao3 ? false : true
          }
          onClick={handleModalClose}
          >
            {`${t('termsConditions.end.button')}`}
          </Button>

            
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsConditionsModal;
