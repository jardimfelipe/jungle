import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().required("Campo obrigatório").email("Insira um email válido"),
  password: Yup.string().required("Mínimo 3 caracteres").required("Campo obrigatório"),
});

export default schema;
