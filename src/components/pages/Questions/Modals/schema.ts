import * as Yup from "yup";

const schema = Yup.object().shape({
  dimension: Yup.string().required("Campo obrigatório"),
  priority: Yup.string().required("Campo obrigatório"),
  weight: Yup.number().required("Campo obrigatório"),
  title: Yup.string().required("Campo obrigatório"),
  type: Yup.string().required("Campo obrigatório"),
});

export default schema;