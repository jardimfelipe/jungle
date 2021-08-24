import * as Yup from "yup";

const schema = Yup.object().shape({
  start: Yup.string().required("Campo obrigatório"),
  end: Yup.string().required("Campo obrigatório"),
  questionnaire: Yup.string().required("Campo obrigatório"),
});

export default schema;
