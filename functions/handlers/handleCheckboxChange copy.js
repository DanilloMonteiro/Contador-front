import useItemUpdater from "@/hooks/useItemUpdater";

export default function handleCheckboxChange(event, itemId, setDesabilitadas) {
  const { name, checked } = event.target;

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

    updatedContador.forEach((item) => {
      useItemUpdater(itemId, item);
    });

    return updatedContador;
  });
}
