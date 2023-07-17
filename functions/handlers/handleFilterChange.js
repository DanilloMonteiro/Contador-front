export default function handleFilterChange(
  event,
  setContador,
  padrao,
  camposAmarelos,
  camposVermelhos,
  maior,
  menor
) {
  if (event.target.value === "all") {
    setContador(padrao);
  }

  if (event.target.value === "yellow") {
    console.log(camposAmarelos, "auqi");
    setContador(camposAmarelos);
  }

  if (event.target.value === "red") {
    setContador(camposVermelhos);
  }

  if (event.target.value === "maior") {
    setContador(maior);
  }

  if (event.target.value === "menor") {
    setContador(menor);
  }
}
