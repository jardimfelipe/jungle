import React, { useState, useEffect, useCallback } from 'react';

import  { Modal, Box, Button, Typography, Label, Select, Textfield } from '../../..'
import { Row, Col } from 'react-flexbox-grid';

import  { useTranslation } from 'react-i18next'

type ModalProps = {
    onClose: () => void;
    isModalOpen: boolean
}



const InsertCompany: React.FC<ModalProps> = ({onClose, isModalOpen}) => {
    const  { t } = useTranslation(); 
    
    function setLista(nome: string){
        let lista = [];
        if(nome == 'corporateName'){
          lista.push(`${t('companies.corporateName.label')}`)
          lista.push(`${t('companies.corporateName.placeholder')}`)
        }
        if(nome == 'cnpj'){
          lista.push(`${t('companies.cnpj.label')}`)
          lista.push(`${t('companies.cnpj.placeholder')}`)
        }
        if(nome == 'managerName'){
          lista.push(`${t('companies.managerName.label')}`)
          lista.push(`${t('companies.managerName.placeholder')}`)
        }
        if(nome == 'emailGestor'){
          lista.push(`${t('companies.emailGestor.label')}`)
          lista.push(`${t('companies.emailGestor.placeholder')}`)     
        }
        if(nome == 'telephoneGestor'){
            lista.push(`${t('companies.telephoneGestor.label')}`)
            lista.push(`${t('companies.telephoneGestor.placeholder')}`)     
          }
        return lista;
     }    
    
     const [corporateName, setCorporateName] = useState<String[]>(setLista('corporateName'));
     const [cnpj, setCnpj] = useState<String[]>(setLista('cnpj'));
     const [managerName, setManagerName] = useState<String[]>(setLista('managerName'));
     const [emailGestor, setEmailGestor] = useState<String[]>(setLista('emailGestor'));
     const [telephoneGestor, setTelephoneGestor] = useState<String[]>(setLista('telephoneGestor'));

    return (<div>
        
        <Modal width={800} height={600} isOpen={isModalOpen} onClose={onClose}>
            <Box params={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                padding: '10px'
            }}>
            <Row>
                <Col md={6}>

                </Col>
                <Col md={6}>
                </Col>
            </Row>
                <Row>
                    <Col md={6}>
                        <Textfield label={corporateName[0].toString()} placeholder={corporateName[1].toString()} />                        
                    </Col>
                    <Col md={6}>
                        <Textfield label={cnpj[0].toString()} placeholder={cnpj[1].toString()} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Textfield label={managerName[0].toString()} placeholder={managerName[1].toString()} />
                    </Col>
                    <Col md={6}>
                        <Textfield label={emailGestor[0].toString()} placeholder={emailGestor[1].toString()} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Textfield label={telephoneGestor[0].toString()} placeholder={telephoneGestor[1].toString()} />
                    </Col>
                    <Col md={6}>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Button block variant="cancel">
                            Cancelar
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button block variant                                                                        ="primary">
                            Ok
                        </Button>
                    </Col>
                </Row>
            </Box>
        </Modal>
    </div>);
}

export default InsertCompany;