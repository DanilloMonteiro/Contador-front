import { useContext, useState } from "react";

import { X } from "@phosphor-icons/react";

import { Toaster } from "react-hot-toast";
import { RowContext } from "@/context/RowContext";

export default function DialogFilter({ isOpen, setIsOpen }) {
  const { filters, setFilters } = useContext(RowContext);

  const [table, setTable] = useState("");
  const [line, setLine] = useState("");
  const [customer, setCustomer] = useState("");
  const [fluigNumber, setFluigNumber] = useState();
  const [highValue, setHighValue] = useState();
  const [lowValue, setLowValue] = useState();
  const [radioColor, setRadioColor] = useState("");
  const [radioDigital, setRadioDigital] = useState();
  const [radioMaterial, setRadioMaterial] = useState();

  const handleRadioChangeMaterial = (e) => {
    setRadioMaterial(e.target.value === "true");
  };

  const handleRadioChangeDigital = (e) => {
    setRadioDigital(e.target.value === "true");
  };

  const handleRadioChangeColor = (e) => {
    setRadioColor(e.target.value);
  };

  const handleCofirm = () => {
    const doc = {
      table: table,
      line: line,
      customer: customer,
      fluig: fluigNumber,
      highCount: highValue,
      lowCount: lowValue,
      color: radioColor,
      digital: radioDigital,
      material: radioMaterial,
    };

    setFilters(doc);
  };

  const clearFields = () => {
    setTable();
    setLine();
    setCustomer();
    setFluigNumber();
    setHighValue("");
    setLowValue("");
    setRadioColor();
    setRadioDigital();
    setRadioMaterial();
  };

  function closePage() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className="fixed opacity-40 bg-gray-300 w-full h-full"></div>
      )}
      {isOpen && (
        <div className="flex fixed bg-white w-1/2 h-[85vh] mt-[3vh] drop-shadow-xl z-10 ">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row w-auto h-auto">
              <p className="text-star font-rubik text-white text-2xl bg-blue-500 px-3 pt-2  w-full">
                Filtrar mesas
              </p>
              <button
                className="bg-blue-500 border-2 border-blue-500 text-white px-3 py-1 hover:bg-white hover:text-blue-500"
                onClick={() => {
                  closePage();
                }}
              >
                <X size={32} weight="bold" />
              </button>
            </div>
            <div className="flex flex-col bg-white w-full h-full p-5 ">
              <h2 className="text-2xl">Selecione os filtros que deseja</h2>
              <div className="flex flex-col w-full h-auto gap-5 mt-6 mr-4 pr-3 overflow-auto overscroll-x-contain overscroll-y-contain">
                <div className="flex flex-row justify-between w-full gap-5 ">
                  <label className="text-xl mr-4 ml-2 w-[100px]">Mesa:</label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="text"
                    placeholder="Digite o código da mesa..."
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-between w-full gap-5">
                  <label className="text-xl mr-4 ml-2 w-[100px]">Linha:</label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="text"
                    placeholder="Digite a linha..."
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-between w-full gap-5">
                  <label className="text-xl mr-4 ml-2 w-[100px]">
                    Cliente:
                  </label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="text"
                    placeholder="Digite o cliente..."
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-between w-full gap-5">
                  <label className="text-xl mr-4 ml-2 w-[100px]">Fluig:</label>
                  <input
                    className="w-full bg-slate-200 px-2"
                    type="number"
                    placeholder="Digite o numero Fluig..."
                    value={fluigNumber}
                    onChange={(e) => setFluigNumber(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-12 grid-rows-2 bg-gray-100 p-1 ">
                  <label className="col-span-3 row-span-2 text-xl mr-4 ml-2">
                    Contagem:
                  </label>

                  <div className="grid col-span-3 row-span-1 w-auto h-[10]">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        name="opcao"
                        value="Vermelho"
                        checked={radioColor === "Vermelho"}
                        onChange={handleRadioChangeColor}
                      />
                      <span className="custom-radio"></span> Vermelho
                    </div>
                  </div>

                  <div className="grid col-span-3 w-auto h-[10]">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        name="opcao"
                        value="Amarelo"
                        checked={radioColor === "Amarelo"}
                        onChange={handleRadioChangeColor}
                      />
                      <span className="custom-radio"></span> Amarelo
                    </div>
                  </div>

                  <div className="grid col-span-3 w-auto h-[10]">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        name="opcao"
                        value="Verde"
                        checked={radioColor === "Verde"}
                        onChange={handleRadioChangeColor}
                      />
                      <span className="custom-radio"></span> Verde
                    </div>
                  </div>

                  <div className="grid col-start-4 col-span-9 w-auto h-[40px]">
                    <div className="flex items-center justify-start gap-1">
                      <label className="mr-1">De:</label>
                      <input
                        className="w-full bg-slate-200 px-2"
                        type="number"
                        placeholder="Valor mínimo"
                        value={lowValue}
                        onChange={(e) => {
                          setLowValue(e.target.value);
                        }}
                      />
                      <label className="mr-1 ml-3">Até:</label>
                      <input
                        className="w-full bg-slate-200 px-2"
                        type="number"
                        placeholder="Valor maximo"
                        value={highValue}
                        onChange={(e) => {
                          setHighValue(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 grid-rows-2 bg-gray-100 p-1 ">
                  <label className="col-span-3 row-span-2 text-xl mr-4 ml-2">
                    Dias para revisão:
                  </label>

                  <div className="grid col-start-4 col-span-9 w-auto h-[40px]">
                    <div className="flex items-center justify-start gap-1">
                      <label className="mr-1">De:</label>
                      <input
                        className="w-full bg-slate-200 px-2"
                        type="number"
                        placeholder="Valor mínimo"
                        value={lowValue}
                        onChange={(e) => {
                          setLowValue(e.target.value);
                        }}
                      />
                      <label className="mr-1 ml-3">Até:</label>
                      <input
                        className="w-full bg-slate-200 px-2"
                        type="number"
                        placeholder="Valor maximo"
                        value={highValue}
                        onChange={(e) => {
                          setHighValue(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <label className="col-span-3 text-xl mr-4 ml-2">
                    Mesa digital:
                  </label>
                  <div className="grid col-span-3 row-span-1 w-auto h-[10]">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        name="opcao1"
                        value="true"
                        checked={radioDigital === true}
                        onChange={handleRadioChangeDigital}
                      />
                      <span className="custom-radio"></span> Sim
                    </div>
                  </div>
                  <div className="grid col-span-3 w-auto h-[10]">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        name="opcao1"
                        value="false"
                        checked={radioDigital === false}
                        onChange={handleRadioChangeDigital}
                      />
                      <span className="custom-radio"></span> Não
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <label className="col-span-3 text-xl mr-4 ml-2">
                    Material:
                  </label>
                  <div className="grid col-span-3 row-span-1 w-auto h-[10]">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        name="opcao2"
                        value="true"
                        checked={radioMaterial === true}
                        onChange={handleRadioChangeMaterial}
                      />
                      <span className="custom-radio"></span> Sim
                    </div>
                  </div>
                  <div className="grid col-span-3 w-auto h-[10]">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        name="opcao2"
                        value="false"
                        checked={radioMaterial === false}
                        onChange={handleRadioChangeMaterial}
                      />
                      <span className="custom-radio"></span> Não
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <label className="col-span-3 text-xl mr-4 ml-2">
                    Desabilitada:
                  </label>
                  <div className="grid col-span-3 row-span-1 w-auto h-[10]">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        name="opcao2"
                        value="true"
                        checked={radioMaterial === true}
                        onChange={handleRadioChangeMaterial}
                      />
                      <span className="custom-radio"></span> Sim
                    </div>
                  </div>
                  <div className="grid col-span-3 w-auto h-[10]">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        name="opcao2"
                        value="false"
                        checked={radioMaterial === false}
                        onChange={handleRadioChangeMaterial}
                      />
                      <span className="custom-radio"></span> Não
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full h-auto mt-auto">
                <button
                  onClick={() => {
                    closePage();
                  }}
                  className="flex flex-row relative bg-white w-auto h-auto px-3 py-[2px] mt-3 border-[2px] rounded-sm text-blue-600 font-semibold hover:bg-blue-500 hover:text-white border-blue-600"
                >
                  Voltar
                </button>
                <button
                  className="flex flex-row relative bg-blue-500 ml-auto w-auto h-auto px-3 py-[2px] mt-3 border-[2px] rounded-sm text-white font-semibold hover:bg-white hover:text-blue-600 border-blue-600 active:bg-blue-500 active:text-white"
                  onClick={(e) => {
                    clearFields();
                  }}
                >
                  Limpar filtro
                </button>
                <button
                  className="flex flex-row relative bg-blue-500 ml-6 w-auto h-auto px-3 py-[2px] mt-3 border-[2px] rounded-sm text-white font-semibold hover:bg-white hover:text-blue-600 border-blue-600 active:bg-blue-500 active:text-white"
                  onClick={(e) => {
                    handleCofirm();
                  }}
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
