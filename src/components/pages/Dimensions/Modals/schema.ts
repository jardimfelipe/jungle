import * as Yup from "yup";

const minNumberValidation = {
  limit: 1, message: 'Esse campo precisar ser maior do que 0'
}

const schema = Yup.object().shape({
  dimension: Yup.string().required("Campo obrigatório"),
  minQuestions: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
  maxQuestions: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
  p1: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
  p2: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
  p3: Yup.number().integer().min(minNumberValidation.limit, minNumberValidation.message).required("Campo obrigatório").typeError('Esse campo precisa ser um número'),
});

export default schema;