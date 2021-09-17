import * as Yup from "yup";

const minNumberValidation = {
  limit: 1, message: 'Esse campo precisar ser maior do que 0'
}

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  qt_minimum: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
  qt_maximum: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
  mandatory: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
  complementary: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
  optional: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
});

export default schema;