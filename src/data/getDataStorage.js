export const getDataStorage = () => {
  const getDataStorage = JSON.parse(localStorage.getItem("transacoes"));

  if (!getDataStorage) {
    return [[], [], 0, 0, 0];
  }

  const [inboundTransactions, outboundTransactions] = getDataStorage.reduce(
    ([inbound, outbound], value) => {
      if (value.type === "Entrada") {
        inbound.push(value);
      } else if (value.type === "Saída") {
        outbound.push(value);
      }
      return [inbound, outbound];
    },
    [[], []]
  );

  const totalInbound = inboundTransactions.reduce(
    (total, transaction) => total + parseInt(transaction.value),
    0
  );

  const totalOutbound = outboundTransactions.reduce(
    (total, transaction) => total + parseInt(transaction.value),
    0
  );

  const total = totalInbound - totalOutbound;

  return [
    inboundTransactions,
    outboundTransactions,
    totalInbound,
    totalOutbound,
    total,
  ];
};
