export default function handleChangeFilter(
  event,
  checked,
  itemId,
  contador,
  setContador
) {
  const { name, value } = event.target;

  console.log(name, "logo");

  setContador((prevContador) => {
    const updatedContador = prevContador.map((item) => {
      if (itemId === item._id && checked === true) {
        return {
          ...item,
          [splited[0]]: {
            ...item.revision,
            [splited[1]]: {
              ...item.revision[splited[1]],
              [splited[2]]: value
                ? new Date(value).toISOString().split("T")[0]
                : null,
            },
          },
        };
      }
    });
  });
}
