export default function handleSimpleSelectChange(
  event,
  itemId,
  setContador,
  ContadorServices
) {
  const { name, value } = event.target;

  console.log(value, "value");

  setContador((prevContador) => {
    const updatedContador = prevContador.map((item) => {
      if (itemId === item._id) {
        return {
          ...item,
          [name]: value === "sim" ? true : false,
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
              `Item com ID ${item._id} atualizado com sucesso no banco de dados ${item.digital_table}.`
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
