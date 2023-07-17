export default function handleChangeFilter(
  event,
  checked,
  itemId,
  ContadorServices,
  setContador
) {
  const name = event.currentTarget.dataset.name;

  const splited = name.split(".");

  setContador((prevContador) => {
    const updatedContador = prevContador.map((item) => {
      if (itemId === item._id && checked === true) {
        return {
          ...item,
          [splited[0]]: {
            ...item.revision,
            [splited[1]]: {
              ...item.revision[splited[1]],
              [splited[2]]: false,
            },
          },
        };
      } else {
        return item;
      }
    });

    updatedContador.forEach((item) => {
      if (item._id === itemId) {
        ContadorServices.update(item._id, item)
          .then((response) => {
            console.log(
              `Item com ID ${item._id} atualizado com sucesso no banco de dados com a data ${item.revision.R0.date}.`
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
