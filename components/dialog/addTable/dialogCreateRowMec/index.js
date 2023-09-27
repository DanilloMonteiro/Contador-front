import { BoardContext } from "@/context/BoardContext";
import ContadorServices from "@/services/contador";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function DialogCreateRowMec() {
  const {
    fetchBoard,
    setIsOpenMenu,
    isOpenChangeRowMec,
    setIsOpenChangeRowMec,
    actualBoardMac,
  } = useContext(BoardContext);

  const [table, setTable] = useState("");
  const [line, setLine] = useState("");
  const [customer, setCustomer] = useState("");
  const [fluigNumber, setFluigNumber] = useState("");
  const [team, setTeam] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();

    let successRow = false;

    try {
      // Crie um novo documento para inserir no MongoDB
      const newTable = {
        table: `Mesa ${table}`,
        line: `line ${line}`,
        customer: `Cliente ${customer}`,
        fluig_number: fluigNumber,
        team: `Time ${team}`,
        count_number: 0,
        digital_table: false,
      };

      try {
        let rowId;

        await ContadorServices.create(newTable)
          .then((response) => {
            successRow = true;
            console.log("Novo item inserido no MongoDB com sucesso");
          })
          .catch((error) => {
            console.error(
              `Erro ao criar um novo item no banco de dados:`,
              error
            );
          });
      } catch (error) {
        console.log(error);
      }

      if (successRow == true) {
        console.log("aqui");
        toast.success(
          "Tudo certo! Mesa criada com sucesso e placa registrada com sucesso!"
        );
        lastPage();
      } else {
        toast.error("Essa ação nao pode ser concluida ERRO: 402!", {
          duration: 4000,
        });
      }

      // Limpar os campos do formulário
      setTable("");
      setLine("");
      setCustomer("");
      setFluigNumber("");
      setTeam("");

      fetchBoard();
    } catch (error) {
      console.error("Erro ao inserir novo item no MongoDB:", error);
    }
  };

  function lastPage() {
    fetchBoard();
    setIsOpenMenu(true);
    setIsOpenChangeRowMec(false);
  }

  return (
    <>
      {isOpenChangeRowMec && (
        <>
          <form className="flex flex-col flex-grow h-full">
            <h2 className="text-3xl ">Dados da mesa mecânica</h2>
            <div className="flex flex-col justify-start gap-5 mt-6 mr-4">
              <div className="flex flex-row justify-between w-full gap-5">
                <label className="text-xl w-[300px] ml-3">
                  Número da mesa:
                </label>
                <input
                  className="w-full bg-slate-200 px-2"
                  type="text"
                  value={table}
                  placeholder="Digite o código da mesa..."
                  onChange={(e) => setTable(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between w-full gap-5">
                <label className="text-xl w-[300px] ml-3">
                  Número da linha:
                </label>
                <input
                  className="w-full bg-slate-200 px-2"
                  type="number"
                  value={line}
                  placeholder="Digite o código da linha..."
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
                  value={customer}
                  placeholder="Digite o código do cliente..."
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
                  placeholder="Digite o número do fluig..."
                  onChange={(e) => setFluigNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between w-full gap-5">
                <label className="text-xl w-[300px] ml-3">
                  Número do time:
                </label>
                <input
                  className="w-full bg-slate-200 px-2"
                  type="number"
                  value={team}
                  placeholder="Digite o código do time..."
                  onChange={(e) => setTeam(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between mt-auto">
              <button
                onClick={() => {
                  lastPage();
                }}
                className="flex flex-row relative bg-white w-auto h-auto px-3 py-[2px] mt-3 border-[2px] rounded-sm text-blue-600 font-semibold hover:bg-blue-500 hover:text-white border-blue-600"
              >
                Voltar
              </button>
              <button
                className="flex flex-row relative bg-blue-500 w-auto h-auto px-3 py-[2px] mt-3 border-[2px] rounded-sm text-white font-semibold hover:bg-white hover:text-blue-600 border-blue-600 active:bg-blue-500 active:text-white"
                onClick={(e) => handleConfirm(e)}
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
