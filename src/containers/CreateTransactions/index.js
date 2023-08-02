import React, { useState } from "react";
import CreateTransactionsView from "../../views/CreateTransactions";
import { useSnackbar } from "notistack";
import { formatDate } from "../../utils/formatDate";

const CreateTransactionsContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dataStorage, setDataStorage] = useState([]);

  const handleRegister = (values, resetForm) => {
    let getDataStorage = JSON.parse(localStorage.getItem("transacoes"));
    let found;
    if (getDataStorage) {
      found = getDataStorage.find((element) => element.title === values.title);
    }
    if (!getDataStorage) {
      dataStorage.push({
        title: values.title,
        value: values.value,
        type: values.type,
        category: values.category,
        date: formatDate(),
      });
      let dataStringfy = JSON.stringify(dataStorage);
      localStorage.setItem("transacoes", dataStringfy);
      enqueueSnackbar("Transação registrada com sucesso!", {
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      resetForm();
    } else if (found) {
      enqueueSnackbar("Título já cadastrado. Tente novamente!", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    } else {
      getDataStorage.push({
        title: values.title,
        value: values.value,
        type: values.type,
        category: values.category,
        date: formatDate(),
      });
      let dataStringfy = JSON.stringify(getDataStorage);
      localStorage.setItem("transacoes", dataStringfy);
      enqueueSnackbar("Transação registrada com sucesso!", {
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      resetForm();
    }
    setDataStorage([]);
  };

  return <CreateTransactionsView handleRegister={handleRegister} />;
};

export default CreateTransactionsContainer;
