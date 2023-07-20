export default function searchFilter(pesquisa, padrao, setContador) {
  const termoLowerCase = pesquisa.toLowerCase();

  console.log(termoLowerCase, "aquii");

  const filtrado = padrao.filter((item) => {
    return (
      item.table.toLowerCase().includes(termoLowerCase) ||
      item.line.toLowerCase().includes(termoLowerCase) ||
      item.customer.toLowerCase().includes(termoLowerCase) ||
      item.fluig_number.toString().includes(termoLowerCase) ||
      item.count_number.toString().includes(termoLowerCase)
    );
  });

  setContador(filtrado);
  return filtrado;
}
