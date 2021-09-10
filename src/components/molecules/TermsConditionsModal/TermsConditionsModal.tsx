import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { removeState, saveState, getSavedState } from '../../../utils/localStorage';
import { logout } from '../../../store/modules/login/actions';

import { Box, Modal, Typography, Checkbox, Button } from '../..';
import { Row, Col } from 'react-flexbox-grid';

const { Text, Title } = Typography;



const TermsConditionsModal: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [ checkbox, setCheckbox ] = useState(false);
  const { currentUser } = useSelector(({login}: RootState)=>login);
  const [isModalOpen, setIsModalOpen] = useState(getSavedState('modal'+currentUser['_id']));


  const handleModalClose = () => {
    setIsModalOpen(false);
    saveState('modal'+currentUser['_id'], false)
  };

  
  const handleLogout = () => {
    removeState('auth.token')
    dispatch(logout())
    removeState('modal'+currentUser['_id'])
  };

  useEffect(()=>{
      if (getSavedState('modal'+currentUser['_id']) == null){
         saveState('modal'+currentUser['_id'], true);
          console.log('Abrir? '+getSavedState('modal'+currentUser['_id']))
      }
      else{
        console.log('Abrir? '+getSavedState('modal'+currentUser['_id']))
      }
  })

  function setLista(nome: string){
     let lista = [];
     if(nome == 'cabecalho'){
       for(let i = 0; i < 5; i++){
         lista.push(`${t('termsConditions.purposes.header.text.'+i)}`)
       }
     }
     if(nome == 'proposicao0'){
       for (var i = 0; i < 9; i++) {
         lista.push(`${t('termsConditions.purposes.purpose0.text.'+i)}`)
       }
     }
     if(nome == 'proposicao1'){
       for (var i = 0; i < 2; i++) {
         lista.push(`${t('termsConditions.purposes.purpose1.text.'+i)}`)
       }
     }
     if(nome == 'proposicao2'){
       for (var i = 0; i < 2; i++) {
         lista.push(`${t('termsConditions.purposes.purpose2.text.'+i)}`)
       }
     }
     if(nome == 'proposicao3'){
       for (var i = 0; i < 1; i++) {
         lista.push(`${t('termsConditions.purposes.purpose3.text.'+i)}`)
       }
     }
     if(nome == 'proposicao4'){
       for (var i = 0; i < 1; i++) {
         lista.push(`${t('termsConditions.purposes.purpose4.text.'+i)}`)
       }
     }
     if(nome == 'proposicao5'){
       for (var i = 0; i < 6; i++) {
         lista.push(`${t('termsConditions.purposes.purpose5.text.'+i)}`)
       }
     }
     if(nome == 'rodape'){
        for (var i = 0; i < 2; i++) {
          lista.push(`${t('termsConditions.purposes.footer.text.'+i)}`)
        }
        lista.push(`${t('termsConditions.purposes.footer.otherText')}`)
        lista.push(`${t('termsConditions.purposes.footer.button')}`)
     }
     return lista;
  }

  const [ cabecalho, setCabecalho ] = useState<string[]>(setLista('cabecalho'));
  const [ proposicao0, setProposicao0 ] = useState<string[]>(setLista('proposicao0'));
  const [ proposicao1, setProposicao1 ] = useState<string[]>(setLista('proposicao1'));
  const [ proposicao2, setProposicao2 ] = useState<string[]>(setLista('proposicao2'));
  const [ proposicao3, setProposicao3 ] = useState<string[]>(setLista('proposicao3'));
  const [ proposicao4, setProposicao4 ] = useState<string[]>(setLista('proposicao4'));
  const [ proposicao5, setProposicao5 ] = useState<string[]>(setLista('proposicao5'));
  const [ rodape, setRodape ] = useState<string[]>(setLista('rodape'));

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
            {`${t('termsConditions.purposes.header.title')}`}
          </Text>
        </Box>

        <Box
          params={{
            padding: '15px 25px',
            backgroundColor: theme.colors.gray,
            overflowY: 'auto',
            maxHeight: '260px',
          }}
        >

        {cabecalho.map((valor, chave)=>{
          if(chave == (cabecalho.length - 1)){
            return <Text paragraph textAlign="justify"><b>{valor}</b></Text>
          }
          else{
            return <Text paragraph textAlign="justify">{valor}</Text>
          }
        })}

        <Title level={3}>{`${t('termsConditions.purposes.purpose0.title')}`}</Title>

        {proposicao0.map((valor, chave)=>{
          if([2,3,4,5,6].includes(chave)){
            return <li>{valor}</li>
          }
          else{
            return <Text paragraph textAlign="justify">{valor}</Text>
          }
        })}

        <Title level={3}>{`${t('termsConditions.purposes.purpose1.title')}`}</Title>
        {proposicao1.map((valor, chave)=>{
          return <Text paragraph textAlign="justify">{valor}</Text>  
        })}

        <Title level={3}>{`${t('termsConditions.purposes.purpose2.title')}`}</Title>
        {proposicao2.map((valor, chave)=>{
          return <Text paragraph textAlign="justify">{valor}</Text>  
        })}


        <Title level={3}>{`${t('termsConditions.purposes.purpose3.title')}`}</Title>
        {proposicao3.map((valor, chave)=>{
          return <Text paragraph textAlign="justify">{valor}</Text>  
        })}


        <Title level={3}>{`${t('termsConditions.purposes.purpose4.title')}`}</Title>
        {proposicao4.map((valor, chave)=>{
          return <Text paragraph textAlign="justify">{valor}</Text>  
        })}


        <Title level={3}>{`${t('termsConditions.purposes.purpose5.title')}`}</Title>
        {proposicao5.map((valor, chave)=>{
          if([2,3,4,5].includes(chave)){
            return <li>{valor}</li>
          }
          else{
            return <Text paragraph textAlign="justify">{valor}</Text>
          }
        })}          

        {rodape.map((valor, chave)=>{
           if([0, 1].includes(chave)){
             return <Text paragraph textAlign="justify">{valor}</Text>  
           }
        })}  
        



        </Box>
        <Box params={{
          padding:  '15px'
        }}>
          <Row>
            {rodape.map((valor, chave)=>{
               if(chave == 2){
                 return <Col md={6}> 
                           <Checkbox 
                             label={valor}  
                             checked={checkbox} 
                             onChange={()=>{setCheckbox(!checkbox) }} ></Checkbox>
                        </Col>
               }
               if(chave == 3){
                 return <Col md={6}>
                         <Button variant="primary" onClick={handleModalClose} block disabled={checkbox ? false : true}>{valor}</Button>
                        </Col>
               }
            })} 
          </Row>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsConditionsModal;
