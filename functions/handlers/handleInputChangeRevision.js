export default function handleInputChangeRevision(
  event,
  itemId,
  setContador,
  ContadorServices
) {
  const { name, value } = event.target;

  console.log(value, "valueaqui");

  const fieldParts = name.split(".");

  setContador((prevContador) => {
    const updatedContador = prevContador.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          [fieldParts[0]]: {
            ...item.revision,
            [fieldParts[1]]: {
              ...item.revision.R0,
              [fieldParts[2]]: value === "sim" ? true : false,
            },
          },
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
