import { BoardContext } from "@/context/BoardContext";
import ContadorServices from "@/services/contador";
import { MagnifyingGlass, Swap } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";

export default function DialogChangeRow() {
  const {
    isOpenChangeRow,
    setIsOpenChangeRow,
    setIsOpenPendingBoard,
    setIsOpenConfirmChange,
    setActualTableMac,
    setActualTable,
  } = useContext(BoardContext);

  const [findTable, setFindTable] = useState("");
  const [findStatus, setFindStatus] = useState("Null");
  const [changeStatus, setChangeStatus] = useState("Null");
  const [search, setSearch] = useState("");

  const [table, setTable] = useState("");
  const [line, setLine] = useState("");
  const [customer, setCustomer] = useState("");
  const [fluigNumber, setFluigNumber] = useState("");
  const [team, setTeam] = useState("");
  const [mac, setMac] = useState("");

  const handleSearch = async () => {
    try {
      console.log(search, "search0");
      console.log(search.length, "search1");
      if (search.length == 0) {
        console.log(search.length, "search2");
        setFindTable("Nada");
        setFindStatus("Nada");
      } else {
        // Realize a pesquisa da mesa com base no número fornecido
        const mesaEncontrada = await ContadorServices.find(search);

        console.log(mesaEncontrada, "mesa encontrada");

        if (mesaEncontrada.data == null) {
          setFindStatus("Erro");
        } else {
          setFindStatus("Find");
          setChangeStatus("Null");
        }

        setActualTable(mesaEncontrada);

        if (mesaEncontrada.data == null || search == "") {
          // Mesa não encontrada, limpe os campos
          setTable("");
          setLine("");
          setCustomer("");
          setFluigNumber("");
          setTeam("");
          setActualTableMac("");
        } else {
          // Preencha os campos com os dados da mesa encontrada
          setTable(mesaEncontrada.data.table);
          setLine(mesaEncontrada.data.line);
          setCustomer(mesaEncontrada.data.customer);
          setFluigNumber(mesaEncontrada.data.fluig_number);
          setTeam(mesaEncontrada.data.team);
          setMac(mesaEncontrada.data.board.mac);
          setActualTableMac(mesaEncontrada.data.board.mac);
        }
      }
      console.log(findTable, "find");
    } catch (error) {
      console.error("Erro ao pesquisar mesa:", error);
    }
  };

  function openConfirmChange() {
    if (findStatus == "Find") {
      setIsOpenChangeRow(false);
      setIsOpenConfirmChange(true);
      setChangeStatus("Null");
    } else {
      setChangeStatus("Erro");
    }
  }

  function lastPage(e) {
    e.preventDefault();
    setIsOpenPendingBoard(true);
    setIsOpenChangeRow(false);
  }

  useEffect(() => {
    setFindTable("Pesquisar");
    setChangeStatus("Null");
    setFindStatus("Null");
    setSearch("");
    setTable("");
    setLine("");
    setCustomer("");
    setFluigNumber("");
    setTeam("");
    setMac("");
  }, [isOpenChangeRow]);

  return (
    <>
      {isOpenChangeRow && (
        <>
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col h-auto w-full">
              <h2 className="text-3xl">Pesquisar mesa</h2>
              <div className="flex flex-col justify-start mt-3 mr-4">
                <div className="flex flex-row items-center justify-center w-auto bg-blue-500 border-2 border-blue-500">
                  <label className="text-xl text-white w-auto ml-3">
                    Número da mesa:
                  </label>
                  <input
                    className="font-rubik mx-2 px-2 py-[3px]"
                    type="text"
                    placeholder="Pesquisar mesa..."
                    onChange={(event) => setSearch(event.target.value)}
                  ></input>
                  <button onClick={() => handleSearch()}>
                    <MagnifyingGlass
                      size={25}
                      className="hover:text-black text-white active:bg-blue-300 mr-1"
                    />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  {findStatus == "Find" && (
                    <span className="text-sm text-green-500 p-1 h-[20px]">
                      Mesa encontrada com sucesso!
                    </span>
                  )}
                  {findStatus == "Erro" && (
                    <span className="text-sm text-red-500 p-1 h-[20px]">
                      Mesa não encontrada!
                    </span>
                  )}
                  {findStatus == "Null" && (
                    <span className="text-sm text-red-500 p-1 h-[20px]"></span>
                  )}
                  {findStatus == "Nada" && (
                    <span className="text-sm text-red-500 p-1 h-[20px]">
                      Digite o código de alguma mesa
                    </span>
                  )}
                </div>
              </div>
            </div>

            <form className="flex flex-col flex-grow w-full h-auto">
              <h3 className="text-2xl ">Dados da mesa pesquisada</h3>

              <div className="flex flex-col justify-start w-full h-full gap-5 mt-6 mr-4">
                <div className="flex flex-row justify-between w-full gap-5">
                  <label className="text-xl w-[300px] ml-3">
                    Número da mesa:
                  </label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="text"
                    disabled={true}
                    value={table}
                    placeholder="Ex:. M2013"
                    onChange={(e) => setTable(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-between w-full gap-5">
                  <label className="text-xl w-[300px] ml-3">
                    Número da linha:
                  </label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="text"
                    disabled={true}
                    value={line}
                    placeholder="Ex:. 49A"
                    onChange={(e) => setLine(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-between w-full gap-5">
                  <label className="text-xl w-[300px] ml-3">
                    Número do cliente:
                  </label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="text"
                    disabled={true}
                    value={customer}
                    placeholder="Ex:. WHP JLLE"
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-between w-full gap-5">
                  <label className="text-xl w-[300px] ml-3">
                    Número do fluig:
                  </label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="number"
                    value={fluigNumber}
                    placeholder="Ex:. 221473"
                    onChange={(e) => setFluigNumber(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-between w-full gap-5">
                  <label className="text-xl w-[300px] ml-3">
                    Número do time:
                  </label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="text"
                    disabled={true}
                    value={team}
                    placeholder="Ex:. 3"
                    onChange={(e) => setTeam(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-between w-full h-auto gap-5">
                  <label className="text-xl w-[335px] ml-3">Código MAC:</label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="text"
                    disabled={true}
                    value={mac}
                    onChange={(e) => setTeam(e.target.value)}
                    placeholder="Ex:. V5-BG-R4-H8-JH-3S"
                  />
                  <Swap
                    size={32}
                    onClick={() => {
                      openConfirmChange();
                    }}
                    className={`w-[50px] h-[25px] hover:drop-shadow-md active:text-white active:bg-blue-500 ${
                      findStatus == "Find" ? "bg-blue-500" : "bg-gray-300"
                    } ${
                      findStatus == "Find"
                        ? "hover:bg-blue-200"
                        : "hover:bg-red-200"
                    } ${
                      findStatus == "Null" || "Nada" || "Erro"
                        ? "active:bg-red-500"
                        : "active:bg-blue-500"
                    }
                  `}
                    weight="fill"
                  />
                </div>
                <div className="flex items-start justify-end">
                  {changeStatus == "Erro" && (
                    <span className="text-sm text-red-500 h-[20px]">
                      É necessario uma mesa selecionada para troca de MAC.
                    </span>
                  )}
                  {changeStatus == "Null" && (
                    <span className="text-sm text-red-500 h-[20px]"></span>
                  )}
                </div>
              </div>
              <div className="flex w-full h-auto justify-between mt-auto">
                <button
                  onClick={(e) => {
                    lastPage(e);
                  }}
                  className="flex flex-row relative bg-white w-auto h-auto px-3 py-[2px] mt-3 border-[2px] rounded-sm text-blue-600 font-semibold hover:bg-blue-500 hover:text-white border-blue-600"
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
