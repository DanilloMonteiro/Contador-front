import useItemUpdater from "@/hooks/useItemUpdater";

export default function handleInputChangeRevision(event, itemId, setContador) {
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
      useItemUpdater(itemId, item);
    });

    return updatedContador;
  });
}
