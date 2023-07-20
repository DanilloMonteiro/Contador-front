import useItemUpdater from "@/hooks/useItemUpdater";

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
      useItemUpdater(itemId, item);
    });

    return updatedContador;
  });
}
