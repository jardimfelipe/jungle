import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().required("Mínimo 3 caracteres").required("Campo obrigatório"),
  password: Yup.string().required("Mínimo 3 caracteres").required("Campo obrigatório"),
  code: Yup.string()
    .test('len', 'Necessário que sejam 5 dígitos', val => !!val && val.length === 5)
});

export default schema;
