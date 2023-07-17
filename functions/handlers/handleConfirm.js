const handleConfirm = async () => {
  try {
    const db = getDatabase();

    // Dados do formulário
    const numeroMesa = "valor_do_input_numero_mesa";
    const numeroLinha = "valor_do_input_numero_linha";
    const numeroCliente = "valor_do_input_numero_cliente";
    const numeroFluig = "valor_do_input_numero_fluig";
    const mesaDigital = "valor_do_input_mesa_digital"; // Pode ser 'Sim' ou 'Não'

    // Crie um novo documento para inserir no MongoDB
    const newTable = {
      numero_mesa: numeroMesa,
      numero_linha: numeroLinha,
      numero_cliente: numeroCliente,
      numero_fluig: numeroFluig,
      mesa_digital: mesaDigital,
    };

    // Insira o novo documento na coleção "nome_da_colecao"
    const result = await db.collection("nome_da_colecao").insertOne(newTable);

    console.log(
      "Novo item inserido no MongoDB com sucesso:",
      result.insertedId
    );
  } catch (error) {
    console.error("Erro ao inserir novo item no MongoDB:", error);
  }
};
