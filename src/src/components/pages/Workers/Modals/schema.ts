import * as Yup from 'yup';

const shema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email().required('Digite um email correto'),
    typeOfPositions: Yup.string().required('Campo obrigatório'),
    emailGestor: Yup.string().required('Campo obrigatório'),
    unityOrLocalization: Yup.string().required('Campo obrigatório'),
    positions: Yup.string().required('Campo obrigatório'),
    peopleLeader: Yup.string().required('Campo obrigatório')
})

export default shema