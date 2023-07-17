import { RowContext } from "@/context/RowContext";
import { useContext } from "react";

export default function SearchBar() {
  const {
    searchFilterWrapper,
    fetchContador,
    setOpenAddTable,
    setOpenTimeRevision,
    setOpenDesableTable,
    camposAmarelos,
    camposVermelhos,
    habilitados2,
  } = useContext(RowContext);

  const restante = camposAmarelos.length + camposVermelhos.length;

  const camposVerdes = habilitados2.length - restante;
  return (
    <div className="flex flex-row bg-blue-300 w-screen h-[100px] px-8 items-center">
      <label className="font-rubik text-lg">Pesquisar :</label>
      <input
        className="font-rubik mx-5 px-2"
        type="text"
        placeholder="Pesquisar..."
        onChange={(event) => searchFilterWrapper(event.target.value)}
      ></input>
      <div className="flex flex-wrap justify-center align-center ml-auto ">
        <div className="flex mx-3">
          <div className="mt-2 mx-1 w-[10px] h-[10px] rounded-full bg-green-500"></div>
          <h4 className="">{camposVerdes}</h4>
        </div>
        <div className="flex mx-3">
          <div className="mt-2 mx-1 w-[10px] h-[10px] rounded-full bg-yellow-500"></div>
          <h4 className="">{camposAmarelos.length}</h4>
        </div>
        <div className="flex mx-3 mr-8">
          <div className="mt-2 mx-1 w-[10px] h-[10px] rounded-full bg-red-500"></div>
          <h4 className="">{camposVermelhos.length}</h4>
        </div>

        <button
          className="bg-white w-[180px] h-[30px] mx-2 border-[2px] rounded-md text-blue-600 font-semibold hover:bg-gray-300 border-blue-600"
          onClick={() => {
            setOpenDesableTable(true);
          }}
        >
          Mesas desabilitadas
        </button>
        <button
          className="bg-white w-[180px] h-[30px] mx-2 border-[2px] rounded-md text-blue-600 font-semibold hover:bg-gray-300 border-blue-600"
          onClick={() => {
            setOpenTimeRevision(true);
          }}
        >
          Revisão por tempo
        </button>
        <button
          className="bg-white w-[140px] h-[30px] mx-2 border-[2px] rounded-md text-blue-600 font-semibold hover:bg-gray-300 border-blue-600"
          onClick={() => {
            setOpenAddTable(true);
          }}
        >
          Adicionar mesa
        </button>
        <button
          className="bg-white w-[100px] h-[30px] mx-2 border-[2px] rounded-md text-blue-600 font-semibold hover:bg-gray-300 border-blue-600"
          onClick={fetchContador}
        >
          Recarregar
        </button>
      </div>
    </div>
  );
}
