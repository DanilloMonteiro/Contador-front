import { RowContext } from "@/context/RowContext";
import { useContext, useState } from "react";

import ContadorServices from "@/services/contador";

export default function DialogAddTable({ isOpen, setIsOpen }) {
  const { fetchContador } = useContext(RowContext);

  const [table, setTable] = useState("");
  const [line, setLine] = useState("");
  const [customer, setCustomer] = useState("");
  const [fluigNumber, setFluigNumber] = useState("");
  const [tableDigital, setTableDigital] = useState("");
  const [team, setTeam] = useState("");

  const handleConfirm = async () => {
    try {
      var tableDigitalBoolean;

      if (tableDigital === "Sim") {
        tableDigitalBoolean = true;
      } else {
        tableDigitalBoolean = false;
      }
      // Crie um novo documento para inserir no MongoDB
      const newTable = {
        table: `Mesa ${table}`,
        line: `line ${line}`,
        customer: `Cliente ${customer}`,
        fluig_number: fluigNumber,
        team: `Time ${team}`,
        count_number: 0,
        digital_table: tableDigitalBoolean,
      };

      ContadorServices.create(newTable)
        .then((response) => {
          console.log("Novo item inserido no MongoDB com sucesso");
        })
        .catch((error) => {
          console.error(`Erro ao criar um novo item no banco de dados:`, error);
        });

      // Limpar os campos do formulário
      setTable("");
      setLine("");
      setCustomer("");
      setFluigNumber("");
      setTableDigital("");
      setTeam("");
    } catch (error) {
      console.error("Erro ao inserir novo item no MongoDB:", error);
    }

    fetchContador();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed opacity-40 bg-gray-300 w-full h-full"></div>
      )}
      {isOpen && (
        <div className="fixed top-0 bg-blue-300 w-1/2 h-[90vh] mt-[3vh] drop-shadow-xl">
          <div className="flex flex-col w-full h-full">
            <p className="text-start text-blue-400 text-4xl bg-white p-3 w-full">
              Adicinar uma nova mesa
            </p>
            <div className="flex flex-col bg-blue-300 w-full h-full">
              <form className="flex flex-col p-2 flex-grow w-full h-full">
                <h2 className="text-3xl mb-5 mx-5">Dados da mesa</h2>
                <div className="flex flex-col gap-5 mx-10">
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-xl">Número da mesa: </label>
                    <input
                      className="w-[300px]"
                      type="number"
                      value={table}
                      onChange={(e) => setTable(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-xl">Número da linha: </label>
                    <input
                      className="w-[300px]"
                      type="number"
                      value={line}
                      onChange={(e) => setLine(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-xl">Número do cliente: </label>
                    <input
                      className="w-[300px]"
                      type="number"
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-xl">Número do fluig: </label>
                    <input
                      className="w-[300px]"
                      type="number"
                      value={fluigNumber}
                      onChange={(e) => setFluigNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-xl">Número do time: </label>
                    <input
                      className="w-[300px]"
                      type="number"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-xl">Mesa digital? </label>
                    <div className="flex flex-row gap-5">
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          value="Sim"
                          checked={tableDigital === "Sim"}
                          onChange={(e) => setTableDigital(e.target.value)}
                        />
                        <label htmlFor="html">Sim</label>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          value="Não"
                          checked={tableDigital === "Não"}
                          onChange={(e) => setTableDigital(e.target.value)}
                        />
                        <label htmlFor="html">Não</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="flex justify-between m-10">
                <button
                  className="bg-blue-200 px-4 py-2 hover:bg-blue-300"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-200 px-4 py-2 hover:bg-blue-300"
                  onClick={handleConfirm}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
