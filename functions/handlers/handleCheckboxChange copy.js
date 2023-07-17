export default function handleCheckboxChange(
  event,
  itemId,
  setDesabilitadas,
  ContadorServices
) {
  const { name, checked } = event.target;

  console.log(name, checked, "a111111");

  setDesabilitadas((prevContador) => {
    const updatedContador = prevContador.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          [name]: checked,
        };
      }
      return item;
    });

    console.log(updatedContador, "aqui222");

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
