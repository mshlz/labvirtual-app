import { setLocale } from "yup"

const translation = {
  mixed: {
    default: "este campo está inválido",
    required: "este campo é obrigatório",
    oneOf: "este campo deve ser um dos seguintes valores: ${values}",
    notOneOf: "este campo não pode ser um dos seguintes valores: ${values}",
  },
  string: {
    length: "este campo deve ter exatamente ${length} caracteres",
    min: "este campo deve ter pelo menos ${min} caracteres",
    max: "este campo deve ter no máximo ${max} caracteres",
    email: "este campo deve ser um e-mail válido",
    url: "este campo deve ter um formato de URL válida",
    trim: "este campo não deve conter espaços no início ou no fim.",
    lowercase: "este campo deve estar em maiúsculo",
    uppercase: "este campo deve estar em minúsculo",
    uuid: "este campo deve ser um UUID válido",
  },
  number: {
    min: "este campo deve ser no mínimo ${min}",
    max: "este campo deve ser no máximo ${max}",
    lessThan: "este campo deve ser menor que ${less}",
    moreThan: "este campo deve ser maior que ${more}",
    notEqual: "este campo não pode ser igual à ${notEqual}",
    positive: "este campo deve ser um número positivo",
    negative: "este campo deve ser um número negativo",
    integer: "este campo deve ser um número inteiro",
  },
  date: {
    min: "${path} deve ser maior que a data ${min}",
    max: "${path} deve ser menor que a data ${max}",
  },
  array: {
    min: "${path} deve ter no mínimo ${min} itens",
    max: "${path} deve ter no máximo ${max} itens",
  },
}

setLocale(translation)
