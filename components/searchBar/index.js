export default function SearchBar({ fetchContador, filtrarTabela }) {
  return (
    <div className="flex flex-row bg-blue-300 w-screen h-[100px] px-8 items-center">
      <label className="font-rubik text-lg">Pesquisar :</label>
      <input
        className="font-rubik mx-5 px-2"
        type="text"
        placeholder="Pesquisar..."
        onChange={(event) => filtrarTabela(event.target.value)}
      ></input>
      <button
        className="bg-white w-[100px] h-[30px] ml-auto border-[2px] rounded-md text-blue-600 font-semibold hover:bg-gray-300 border-blue-600"
        onClick={fetchContador}
      >
        Recarregar
      </button>
    </div>
  );
}
