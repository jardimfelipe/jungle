import * as Yup from "yup";

const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().required('Campo obrigatório'), 
    unit_location: Yup.string().required('Campo obrigatório'), 
    type_of_position: Yup.string().required('Campo obrigatório'), 
    office: Yup.string().required('Campo obrigatório'), 
    area_department_board: Yup.string().required('Campo obrigatório'),
    people_leader: Yup.string().required('Campo obrigatório'),
    direct_manager_email: Yup.string().required('Campo obrigatório')
})


export default schema