export const getDataStorage = () => {
  let getDataStorage = JSON.parse(localStorage.getItem("transacoes"));
  let entrada, saida, somaEntrada, somaSaida, subtotalConta;

  if (getDataStorage !== null) {
    entrada = getDataStorage.filter((value) => value.tipo === "Entrada");
    saida = getDataStorage.filter((value) => value.tipo === "Saída");
    subtotalConta = somaEntrada - somaSaida;
    for (let i = 0; i < entrada.length; i++) {
      somaEntrada += parseInt(entrada[i].valor);
    }

    for (let i = 0; i < saida.length; i++) {
      somaSaida += parseInt(saida[i].valor);
    }

    return [entrada, saida, somaEntrada, somaSaida, subtotalConta];
  }

  return Array.from(new Array(5), () => []);
};
