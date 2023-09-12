import { BoardContext } from "@/context/BoardContext";
import { RowContext } from "@/context/RowContext";
import BoardServices from "@/services/board";
import ContadorServices from "@/services/contador";
import { MagnifyingGlass, Swap } from "@phosphor-icons/react";
import { useContext, useState } from "react";

export default function DialogConfirmChange() {
  const { fetchContador } = useContext(RowContext);
  const {
    isOpenConfirmChange,
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

  const [newMacCode, setNewMacCode] = useState("");

  const [selectedInput, setSelectedInput] = useState(false);
  const [differentInput, setDifferentInput] = useState(false);

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

  function selectedBoard(e) {
    e.preventDefault();

    setSelectedInput(true);
    setDifferentInput(false);
    console.log(differentInput, "dif");
    console.log(selectedInput);
  }

  function differentBoard(e) {
    e.preventDefault();

    setDifferentInput(true);
    setSelectedInput(false);
    console.log(differentInput, "dif");
    console.log(selectedInput);
  }

  function openConfirmChange() {
    setIsOpenChangeRow(true);
    setIsOpenConfirmChange(false);
  }

  function lastPage(e) {
    e.preventDefault();
    setIsOpenChangeRow(true);
    setIsOpenConfirmChange(false);
  }

  return (
    <>
      {isOpenConfirmChange && (
        <>
          <form className="flex flex-col flex-grow h-full w-full">
            <h3 className="text-2xl mt-3">Confimação de troca de MAC</h3>

            <div className="flex flex-col justify-start w-full h-full gap-5 mt-6 mr-4">
              <div className="flex flex-row justify-between w-full h-auto gap-5">
                <label className="flex flex-nowrap text-xl text-right w-auto h-auto">
                  Código MAC atual:
                </label>
                <input
                  className="flex flex-grow w-auto h-auto bg-slate-200 px-2"
                  type="text"
                  value={actualTableMac}
                  onChange={(e) => setTeam(e.target.value)}
                />
              </div>
              <div>
                <h3 className="text-xl">Deseja trocar por qual mac?</h3>
              </div>
              <div className="flex gap-10 h-auto">
                <button
                  onClick={(e) => {
                    selectedBoard(e);
                  }}
                  className={`flex flex-row relative bg-slate-200 w-auto h-auto 
                  px-3 py-[2px] border-[2px] rounded-sm text-blue-500 
                  font-semibold  hover:border-[2px] hover:border-blue-600 ${
                    selectedInput === true
                      ? "border-blue-600"
                      : "border-slate-200"
                  }`}
                >
                  MAC da placa selecionada
                </button>
                <button
                  onClick={(e) => {
                    differentBoard(e);
                  }}
                  className={`flex flex-row relative bg-slate-200 w-auto h-auto 
                  px-3 py-[2px] border-[2px] rounded-sm text-blue-500 
                  font-semibold  hover:border-[2px] hover:border-blue-600 ${
                    differentInput === true
                      ? "border-blue-600"
                      : "border-slate-200"
                  }`}
                >
                  Digitar um MAC
                </button>
              </div>
              {selectedInput === true && (
                <>
                  <div className="flex flex-row justify-between w-full h-auto gap-5">
                    <label className="flex flex-nowrap text-xl text-right w-auto h-auto">
                      Novo código MAC:
                    </label>
                    <input
                      className="flex flex-grow w-auto h-auto bg-slate-200 px-2"
                      type="text"
                      value={actualBoardMac}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="bg-slate-200 p-2 pb-6">
                    <h3 className="text-xl">Digite a sua senha</h3>
                    <div className="flex flex-row justify-start w-full h-auto gap-5 mt-3 ">
                      <label className="flex flex-nowrap text-xl text-right w-auto h-auto">
                        Senha:
                      </label>
                      <input
                        className="flex  w-[200px] h-auto bg-white px-2"
                        type="text"
                        value={""}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </>
              )}
              {differentInput === true && (
                <>
                  <div className="flex flex-row justify-between w-full h-auto gap-5">
                    <label className="flex flex-nowrap text-xl text-right w-auto h-auto">
                      Digite o novo código MAC:
                    </label>
                    <input
                      className="flex flex-grow w-auto h-auto bg-slate-200 px-2"
                      type="text"
                      value={newMacCode}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="bg-slate-200 p-2 pb-6">
                    <h3 className="text-xl">Digite a sua senha</h3>
                    <div className="flex flex-row justify-start w-full h-auto gap-5 mt-3 ">
                      <label className="flex flex-nowrap text-xl text-right w-auto h-auto">
                        Senha:
                      </label>
                      <input
                        className="flex  w-[200px] h-auto bg-white px-2"
                        type="text"
                        value={""}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-between mt-auto">
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
