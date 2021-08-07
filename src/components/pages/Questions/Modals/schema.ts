import * as Yup from "yup";

const minNumberValidation = {
  limit: 1, message: 'Esse campo precisar ser maior do que 0'
}

const schema = Yup.object().shape({
  dimension: Yup.string().required("Campo obrigatório"),
  priority: Yup.string().required("Campo obrigatório"),
  weight: Yup.number().required("Campo obrigatório"),
  title: Yup.string().required("Campo obrigatório"),
  type: Yup.string().required("Campo obrigatório"),
});

export default schema;