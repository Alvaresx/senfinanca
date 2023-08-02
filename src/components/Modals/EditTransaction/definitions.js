import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Título é obrigatório"),
  value: Yup.string().required("Valor é obrigatório"),
  type: Yup.string().required("Tipo é obrigatório"),
  category: Yup.string().required("Categoria é obrigatório"),
});

export const categories = [
  "Alimentação",
  "Educação",
  "Entretenimento",
  "Saúde",
  "Transporte",
];

export const types = ["Entrada", "Saída"];
