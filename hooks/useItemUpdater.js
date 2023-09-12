import ContadorServices from "@/services/contador";

const useItemUpdater = (itemId, item) => {
  if (item._id === itemId) {
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
