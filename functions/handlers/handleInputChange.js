export default function handleInputChange(
  event,
  itemId,
  setContador,
  ContadorServices
) {
  const { name, value } = event.target;

  setContador((prevContador) => {
    const updatedContador = prevContador.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });

    updatedContador.forEach((item) => {
      if (item._id === itemId) {
        ContadorServices.update(item._id, item)
          .then((response) => {
            console.log(
              `Item com ID ${item._id} atualizado com sucesso no banco de dados.`
            );
          })
          .catch((error) => {
            console.error(
              `Erro ao atualizar o item com ID ${item._id} no banco de dados:`,
              error
            );
          });
      }
    });

    return updatedContador;
  });
}
