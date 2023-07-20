import useItemUpdater from "@/hooks/useItemUpdater";

export default function handleSimpleSelectChange(event, itemId, setContador) {
  const { name, value } = event.target;

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
      useItemUpdater(itemId, item);
    });

    return updatedContador;
  });
}
