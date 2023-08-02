export const getDataStorage = () => {
  let getDataStorage = JSON.parse(localStorage.getItem("transacoes"));
  let somaEntrada = 0,
    somaSaida = 0,
    subtotalConta = 0;
  let entrada = [],
    saida = [];

  if (getDataStorage !== null) {
    entrada = getDataStorage.filter((value) => value.tipo === "Entrada");
    saida = getDataStorage.filter((value) => value.tipo === "Saída");

    for (let i = 0; i < entrada.length; i++) {
      somaEntrada += parseInt(entrada[i].valor);
    }

    for (let i = 0; i < saida.length; i++) {
      somaSaida += parseInt(saida[i].valor);
    }

    subtotalConta = somaEntrada - somaSaida;

    return [entrada, saida, somaEntrada, somaSaida, subtotalConta];
  }

  return [[], [], 0, 0, 0];
};
