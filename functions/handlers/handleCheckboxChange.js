import useItemUpdater from "@/hooks/useItemUpdater";

export default function handleCheckboxChange2(event, itemId, setContador) {
  const { name, checked } = event.target;

  setContador((prevContador) => {
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
