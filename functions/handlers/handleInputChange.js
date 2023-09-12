import useItemUpdater from "@/hooks/useItemUpdater";

export default function handleInputChange(event, itemId, setContador) {
  const { name, value } = event.target;

  console.log(name, value, "adqwedas");

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
      useItemUpdater(itemId, item);
    });

    return updatedContador;
  });
}
