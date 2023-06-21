import Navbar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import Table from "@/components/table";
import ContadorServices from "@/services/contador";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [contador, setContador] = useState([]);
  const [camposAmarelos, setCamposAmarelos] = useState([]);
  const [camposVermelhos, setCamposVermelhos] = useState([]);
  const [maior, setMaior] = useState([]);
  const [menor, setMenor] = useState([]);
  const [padrao, setPadrao] = useState([]);

  async function fetchContador() {
    const response = await ContadorServices.index();
    if (response.data.length >= 1) {
      const camposFiltradosAmarelos = response.data.filter(
        (c) => change(c.nCiclos) === "yellow"
      );
      const camposFiltradosVermelhos = response.data.filter(
        (c) => change(c.nCiclos) === "red"
      );

      const sortedDataMaior = [...response.data].sort(
        (a, b) => b.nCiclos - a.nCiclos
      );

      const sortedDataMenor = [...response.data].sort(
        (a, b) => a.nCiclos - b.nCiclos
      );

      setMaior(sortedDataMaior);
      setMenor(sortedDataMenor);
      setCamposVermelhos(camposFiltradosVermelhos);
      setCamposAmarelos(camposFiltradosAmarelos);
      setContador(response.data);
      setPadrao(response.data);
    }
  }

  function filtrarTabela(pesquisa) {
    const termoLowerCase = pesquisa.toLowerCase();

    const filtrado = padrao.filter((item) => {
      return (
        item.mesa.toLowerCase().includes(termoLowerCase) ||
        item.linha.toLowerCase().includes(termoLowerCase) ||
        item.cliente.toLowerCase().includes(termoLowerCase) ||
        item.nFluig.toString().includes(termoLowerCase) ||
        item.nCiclos.toString().includes(termoLowerCase)
      );
    });

    setContador(filtrado);
    return filtrado;
  }

  const handleSelectChange = (event) => {
    if (event.target.value === "all") {
      setContador(padrao);
    }

    if (event.target.value === "yellow") {
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
  };

  const stop = 30000;

  const nextPrev = stop - 5000;

  const danger = (value) => {
    if (value >= stop) {
      return "red";
    } else if (value >= nextPrev) {
      return "yellow";
    } else if (value < nextPrev) {
      return "green";
    }
  };

  const change = (value) => {
    const color = danger(value);

    return color;
  };

  useEffect(() => {
    fetchContador();
  }, []);

  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center bg-blue-300">
        <Navbar />
        <SearchBar
          fetchContador={fetchContador}
          filtrarTabela={filtrarTabela}
        />
        <Table
          handleSelectChange={handleSelectChange}
          contador={contador}
          change={change}
        />
      </div>
    </>
  );
}
