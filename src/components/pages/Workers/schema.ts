import * as Yup from "yup";

const schema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    unidade: Yup.string().required('Campo obrigatório'),
    cargo: Yup.string().required('Campo obrigatório'),
    lider: Yup.string().required('Campo obrigatório'),
    tipo: Yup.string().required('Campo obrigatório'),
    area: Yup.string().required('Campo obrigatório'),
    email: Yup.string().required('Campo obrigatório')
})

export default schema