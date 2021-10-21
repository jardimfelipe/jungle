import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().required("Campo obrigatório").email("Insira um email válido"),
});

export default schema;
