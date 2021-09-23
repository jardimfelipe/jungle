import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().required("Mínimo 3 caracteres").required("Campo obrigatório"),
  password: Yup.string().required("Mínimo 3 caracteres").required("Campo obrigatório"),
  code: Yup.string()
    .test('len', 'Necessário que sejam 4 dígitos', val => !!val && val.length === 4)
});

export default schema;
