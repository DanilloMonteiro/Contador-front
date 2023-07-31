import ContadorServices from "@/services/contador";

const useItemUpdater = (itemId, item) => {
  console.log(itemId, item, "aqui items");
  if (item._id === itemId) {
    console.log(itemId, item, "aqui items 222");
    ContadorServices.update(item._id, item)
      .then((response) => {
        console.log(`ID ${item._id} atualizado no banco de dados.`);
      })
      .catch((error) => {
        console.error(
          `Erro ao atualizar ID ${item._id} no banco de dados:`,
          error
        );
      });
  }
};

export default useItemUpdater;
