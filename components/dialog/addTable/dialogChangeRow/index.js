import { BoardContext } from "@/context/BoardContext";
import { RowContext } from "@/context/RowContext";
import BoardServices from "@/services/board";
import ContadorServices from "@/services/contador";
import { MagnifyingGlass, Swap } from "@phosphor-icons/react";
import { useContext, useState } from "react";

export default function DialogChangeRow() {
  const { fetchContador } = useContext(RowContext);
  const {
    isOpenChangeRow,
    setIsOpenChangeRow,
    setIsOpenPendingBoard,
    setIsOpenConfirmChange,
    actualBoardId,
    actualBoardMac,
    setActualTableMac,
    actualTableMac,
  } = useContext(BoardContext);

  const [foundTable, setFoundTable] = useState(null);

  const [table, setTable] = useState("");
  const [line, setLine] = useState("");
  const [customer, setCustomer] = useState("");
  const [fluigNumber, setFluigNumber] = useState("");
  const [team, setTeam] = useState("");

  const handleSearch = async () => {
    try {
      // Realize a pesquisa da mesa com base no número fornecido
      console.log(table);
      const mesaEncontrada = await ContadorServices.find(table);

      console.log("aqui");
      console.log(mesaEncontrada);

      if (mesaEncontrada) {
        // Preencha os campos com os dados da mesa encontrada
        setFoundTable(mesaEncontrada.data);
        setTable(mesaEncontrada.data.table);
        setLine(mesaEncontrada.data.line);
        setCustomer(mesaEncontrada.data.customer);
        setFluigNumber(mesaEncontrada.data.fluig_number);
        setTeam(mesaEncontrada.data.team);
        setActualTableMac(mesaEncontrada.data.board.mac);
      } else {
        // Mesa não encontrada, limpe os campos
        console.log("entrou no else");
        setFoundTable(null);
        setTable("");
        setLine("");
        setCustomer("");
        setFluigNumber("");
        setTeam("");
        setActualTableMac("");
      }
    } catch (error) {
      console.error("Erro ao pesquisar mesa:", error);
    }
  };

  function openConfirmChange() {
    setIsOpenChangeRow(false);
    setIsOpenConfirmChange(true);
  }

  function lastPage(e) {
    e.preventDefault();
    setIsOpenPendingBoard(true);
    setIsOpenChangeRow(false);
  }

  return (
    <>
      {isOpenChangeRow && (
        <>
          <div className="flex flex-col h-auto">
            <h2 className="text-3xl">Pesquisar mesa</h2>
            <div className="flex flex-col justify-start gap-5 mt-3 mr-4">
              <div className="flex flex-row items-center justify-center w-auto bg-blue-500 border-2 border-blue-500">
                <label className="text-xl text-white w-auto text-right">
                  Número da mesa:
                </label>
                <input
                  className="font-rubik mx-2 px-2 py-[3px]"
                  type="number"
                  placeholder="Pesquisar mesa..."
                  onChange={(event) => setTable(event.target.value)}
                ></input>
                <button onClick={() => handleSearch()}>
                  <MagnifyingGlass
                    size={25}
                    className="hover:text-black text-white active:bg-blue-300 mr-1"
                  />
                </button>
              </div>
            </div>
          </div>

          <form className="flex flex-col flex-grow h-auto">
            <h3 className="text-2xl mt-3">Dados da mesa pesquisada</h3>

            <div className="flex flex-col justify-start w-full h-full gap-5 mt-6 mr-4">
              <div className="flex flex-row justify-between w-full gap-5">
                <label className="text-xl w-[300px] text-right">
                  Número da mesa:
                </label>
                <input
                  className="w-full bg-slate-200 px-2"
                  type="text"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between w-full gap-5">
                <label className="text-xl w-[300px] text-right">
                  Número da linha:
                </label>
                <input
                  className="w-full bg-slate-200 px-2"
                  type="text"
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between w-full gap-5">
                <label className="text-xl w-[300px] text-right">
                  Número do cliente:
                </label>
                <input
                  className="w-full bg-slate-200 px-2"
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between w-full gap-5">
                <label className="text-xl w-[300px] text-right">
                  Número do fluig:
                </label>
                <input
                  className="w-full bg-slate-200 px-2"
                  type="number"
                  value={fluigNumber}
                  onChange={(e) => setFluigNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between w-full gap-5">
                <label className="text-xl w-[300px] text-right">
                  Número do time:
                </label>
                <input
                  className="w-full bg-slate-200 px-2"
                  type="text"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between w-full h-auto gap-5">
                <label className="text-xl w-[335px] text-right">
                  Código MAC:
                </label>
                <input
                  className="w-full bg-slate-200 px-2"
                  type="text"
                  disabled={true}
                  value={actualTableMac}
                  onChange={(e) => setTeam(e.target.value)}
                />
                <Swap
                  size={32}
                  onClick={() => {
                    openConfirmChange();
                  }}
                  className="bg-blue-500 w-[50px] h-[25px] hover:bg-blue-200 hover:drop-shadow-md active:text-white active:bg-blue-500"
                  weight="fill"
                />
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <button
                onClick={(e) => {
                  lastPage(e);
                }}
                className="flex flex-row relative bg-white w-auto h-auto px-3 py-[2px] mt-3 border-[2px] rounded-sm text-blue-600 font-semibold hover:bg-blue-500 hover:text-white border-blue-600"
              >
                Voltar
              </button>
              <button
                className="flex flex-row relative bg-blue-500 w-auto h-auto px-3 py-[2px] mt-3 border-[2px] rounded-sm text-white font-semibold hover:bg-white hover:text-blue-600 border-blue-600 active:bg-blue-500 active:text-white"
                onClick={() => {}}
              >
                Confirmar
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
