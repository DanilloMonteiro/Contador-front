import Navbar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import Table from "@/components/table";
import { RowContext } from "@/context/RowContext";
import { useContext } from "react";

export default function Home() {
  const {
    showConfirmation,

    confirmDateChange,
    cancelDateChange,
  } = useContext(RowContext);

  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center bg-blue-300">
        <Navbar />
        <SearchBar />
        <Table />
        {showConfirmation && (
          <div className="fixed opacity-40 bg-gray-300 w-full h-full"></div>
        )}
        {showConfirmation && (
          <div className="fixed opacity-100 top-[20%] left-[35%] bg-white w-[400px] h-[300px] p-10 drop-shadow-xl">
            <div className="flex flex-col">
              <p className="text-center text-xl mt-[20px]">
                Deseja confirmar a mudança da data?
              </p>
              <div className="flex flex-row justify-between mt-[85px]">
                <button
                  className="bg-blue-200 px-4 py-2 hover:bg-blue-300"
                  onClick={() => confirmDateChange()}
                >
                  Confirmar
                </button>
                <button
                  className="bg-blue-200 px-4 py-2 hover:bg-blue-300"
                  onClick={cancelDateChange}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
