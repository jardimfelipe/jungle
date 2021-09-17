import React, { useState, useEffect, useCallback } from 'react';

import {
    Modal,
    Box,
    Button,
    Typography,
    Label,
    Select,
    Textfield,
    ImageUploader
} from '../../..'
import { Row, Col } from 'react-flexbox-grid';

import { useTranslation } from 'react-i18next'

import axios from 'axios'
import { Title } from '../../../atoms/Typography/title';
import { Text } from '../../../atoms/Typography/text';


type ModalProps = {
    onClose: () => void;
    isModalOpen: boolean
}


const InsertCompany: React.FC<ModalProps> = ({ onClose, isModalOpen }) => {
    const { t, i18n } = useTranslation();

    function setLista(nome: string) {
        let lista = [];
        if (nome == 'corporateName') {
            lista.push(`${t('companies.corporateName.label')}`)
            lista.push(`${t('companies.corporateName.placeholder')}`)
        }
        if (nome == 'cnpj') {
            lista.push(`${t('companies.cnpj.label')}`)
            lista.push(`${t('companies.cnpj.placeholder')}`)
        }
        if (nome == 'managerName') {
            lista.push(`${t('companies.managerName.label')}`)
            lista.push(`${t('companies.managerName.placeholder')}`)
        }
        if (nome == 'emailGestor') {
            lista.push(`${t('companies.emailGestor.label')}`)
            lista.push(`${t('companies.emailGestor.placeholder')}`)
        }
        if (nome == 'telephoneGestor') {
            lista.push(`${t('companies.telephoneGestor.label')}`)
            lista.push(`${t('companies.telephoneGestor.placeholder')}`)
        }
        if (nome == 'sector') {
            lista.push(`${t('companies.sector.label')}`)
            lista.push(`${t('companies.sector.default')}`)
            for (var i = 0; i < 2; i++) {
                let valor = `${t('companies.sector.select.'+i+'.value')}`
                let texto = `${t('companies.sector.select.'+i+'.label')}`

                lista.push({ value: valor, label: texto })
            }
        }
        if (nome == 'country') {
            lista.push(`${t('companies.country.label')}`)
            lista.push(`${t('companies.country.default')}`)
            for (var i = 0; i < 2; i++) {
                let valor = `${t('companies.country.select.'+i+'.value')}`
                let texto = `${t('companies.country.select.'+i+'.label')}`
                lista.push({ value: valor, label: texto })
            }
        } 
        return lista;
    }



    const [corporateName, setcorporateName] = useState<Object[]>(setLista('corporateName'));
    const [cnpj, setCnpj] = useState<Object[]>(setLista('cnpj'));
    const [managerName, setManagerName] = useState<Object[]>(setLista('managerName'));
    const [emailGestor, setEmailGestor] = useState<Object[]>(setLista('emailGestor'));
    const [telephoneGestor, setTelephoneGestor] = useState<Object[]>(setLista('telephoneGestor'));
    const [sector, setSector] = useState<Object[]>(setLista('sector'));
    const [country, setCountry] = useState<Object[]>(setLista('country'));

    const [corporateNameForm, setcorporateNameForm] = useState<string>('');
    const [cnpjForm, setCnpjForm] = useState<string>('');
    const [managerNameForm, setManagerNameForm] = useState<string>('');
    const [emailGestorForm, setEmailGestorForm] = useState<string>('');
    const [telephoneGestorForm, setTelephoneGestorForm] = useState<string>('');
    const [sectorForm, setSectorForm] = useState<string>('');
    const [countryForm, setCountryForm] = useState<string>(''); 



    function setSublista(name: string) {
        let lista : Object[] = [];
        let sublista = null;
        if (name == 'section') { 
            sublista = sector 
            if(sublista != null){
                for (let i = 0; i < sublista.length; i++) {
                    if (i > 1) {
                        let obj = {teste: sublista[i]}
                        lista.push(obj)
                    }
                }
            }
        }
        if (name == 'country') { 
            sublista = country 

            if(i18n.language == "enUS"){
                const api = axios.create({
                    baseURL:  "https://restcountries.eu/rest/v2/"
                });
    
                type obj = {
                    name: String
                }
    
                api.get("/all?fields=name")
                    .then((resp) => { 
                        resp.data.forEach((item: obj)=>{
                            let obj = { value: item.name, label: item.name }
                            lista.push(obj)
                        })
                    })
                    .catch((err) => { console.error(err) });
            }
            if(i18n.language == "ptBR"){
                const api = axios.create({
                    baseURL:  "https://servicodados.ibge.gov.br/api/v1/"
                });
    
                type subobj = {
                    abreviado: string
                }
                type obj = {
                    nome: subobj
                }
    
                api.get("/paises/")
                    .then((resp) => { 
                        resp.data.forEach((item: obj)=>{
                            let obj = { value: item.nome.abreviado, label: item.nome.abreviado }
                            lista.push(obj)
                        })
                    })
                    .catch((err) => { console.error(err) });
            }
            if(i18n.language == "esES"){
                const api = axios.create({
                    baseURL:  "https://servicodados.ibge.gov.br/api/v1/"
                });
    
                type subobj = {
                    abreviado: string
                }
                type obj = {
                    nome: subobj
                }
    
                api.get("/paises/")
                    .then((resp) => { 
                        resp.data.forEach((item: obj)=>{
                            let obj = { value: item.nome.abreviado, label: item.nome.abreviado }
                            lista.push(obj)
                        })
                    })
                    .catch((err) => { console.error(err) });
            }
            
            
        }

        return lista;
    } 
      

    const [sectorList, setSectorList] = useState<Object[]>(setSublista('sector'));
    const [countryList, setCoutryList] = useState<Object[]>(setSublista('country'));


    const [ desabilitar, setDesbilitar ] = useState<boolean>(true);

    return (< div >
        <Modal width={800} height={685} isOpen={isModalOpen} onClose={onClose}> 
        
        <Box params={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            padding: '10px',
            paddingTop: '20px'
        }}> 
        
            <Box params={{padding: '10px'}}>
                <Title level={1}>{`${t('companies.header.title')}`}</Title>
                <Text paragraph>{`${t('companies.header.subtitle')}`}</Text>
            </Box>

            <Row> 
                <Col md={6}> 
                    <Box params={{marginBottom: '9px'}}> 
                        <label> Logotipo da empresa </label>
                    </Box>
                    <ImageUploader onChange={(e) => {return false}} />
                </Col> 
                <Col md={6}> 
                    
                    <Box params={{ marginBottom: '9px' }}> 
                        <label>{`${country[0].toString()}`}</label>
                    </Box> 

                    <Select 
                        options={countryList} 
                        placeholder={country[1].toString()}
                        onChange={(e)=>{
                            if(e != null){
                                if(e.value == "Brasil" || e.value == "Brazil"){
                                    setDesbilitar(false);
                                }
                                else {
                                    setDesbilitar(true)
                                }
                                setCountry(e.value)
                            }
                        }}
                        />

                </Col> 
            </Row>
                <Row>
                    <Col md={6}>
                        <Textfield value={corporateNameForm} onChange={(e)=>{setcorporateNameForm(e.target.value)}} label={corporateName[0].toString()} placeholder={corporateName[1].toString()} /> 
                    </Col> 
                    <Col md={6}> 
                        <Textfield value={cnpjForm} disabled={desabilitar}  onChange={(e)=>{setCnpjForm(e.target.value)}} label={cnpj[0].toString()} placeholder={cnpj[1].toString()} /> 
                    </Col>
                </Row> 
                <Row> 
                    <Col md={6}> 
                        <Textfield value={managerNameForm}  onChange={(e)=>{setManagerNameForm(e.target.value)}} label={managerName[0].toString()} placeholder={managerName[1].toString()} /> 
                    </Col>
                    <Col md={6}>
                        <Textfield value={emailGestorForm}  onChange={(e)=>{setEmailGestorForm(e.target.value)}} label={emailGestor[0].toString()} placeholder={emailGestor[1].toString()} /> </Col> 
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Textfield value={telephoneGestorForm}  onChange={(e)=>{setTelephoneGestorForm(e.target.value)}} label={telephoneGestor[0].toString()} placeholder={telephoneGestor[1].toString()} /> </Col> 
                        <Col md={6}> 
                            <Box params={{ marginBottom: '9px' }}> 
                                <label> {`${sector[0].toString()}`} </label>
                            </Box> 

                            <Select 
                                options={sectorList}
                                placeholder={sector[1].toString()}
                                onChange={(e)=>{if(e != null)setSectorForm(e.value)}}
                                />
                        </Col> 
                    </Row>
                        <Row>
                            <Col md={6}>
                                <Button block variant="cancel" onClick={onClose}>
                                    Cancelar
                                </Button > 
                            </Col> 
                            <Col md={6}> 
                                <Button block variant="primary" onClick={()=>{
                                    let fd = new FormData();

                                    fd.append('cnpj', cnpjForm)
                                    fd.append('corporate name', corporateNameForm)
                                    fd.append('manager name', managerNameForm)
                                    fd.append('email gestor', emailGestorForm)
                                    fd.append('telefone gestor', telephoneGestorForm)
                                    fd.append('sector', sectorForm)
                                    fd.append('country', countryForm)


                                }}>
                                     Ok
                                 </Button>
                            </Col>
                            </Row> 
                    </Box>
            </Modal> 
    </div>);
}

export default InsertCompany;
