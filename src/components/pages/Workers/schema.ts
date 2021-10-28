import * as Yup from "yup";

const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().required('Campo obrigatório'), 
    unity_location: Yup.string().required('Campo obrigatório'), 
    type_of_position_s: Yup.string().required('Campo obrigatório'), 
    office_s: Yup.string().required('Campo obrigatório'), 
    area_department_board_s: Yup.string().required('Campo obrigatório'),
    people_leader_s: Yup.string().required('Campo obrigatório'),
    direct_manager_email: Yup.string().required('Campo obrigatório')
})




export default schema