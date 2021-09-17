import * as Yup from "yup";

const schema = Yup.object().shape({
  currentPassword: Yup.string().required("Campo obrigatório"),
  newPassword: Yup.string().required("Mínimo 3 caracteres").required("Campo obrigatório"),
  confirmPassword: Yup.string().required("Mínimo 3 caracteres").required("Campo obrigatório"),
});

export default schema;
