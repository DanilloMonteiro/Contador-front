import { RowContext } from "@/context/RowContext";
import { X } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";

export default function DialogDisableTable({ isOpen, setIsOpen }) {
  const { queryData, fetchRow } = useContext(RowContext);

  const [disbledQuantity, setDisabledQuantity] = useState([]);

  function quantityDisabled() {
    const disabledItems = queryData.filter((item) => item.disabled === true);

    setDisabledQuantity(disabledItems);
  }

  useEffect(() => {
    quantityDisabled();
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed opacity-40 bg-gray-300 w-full h-full z-10"></div>
      )}
      {isOpen && (
        <div className="fixed bg-white w-1/2 h-[90vh] mt-[3vh] drop-shadow-xl z-10">
          <div className="flex flex-col w-full h-full ">
            <div className="flex flex-row ">
              <p className="text-star font-rubik text-white text-2xl bg-blue-500 px-3 pt-2  w-full">
                Mesas desabilitadas
              </p>
              <button
                className="bg-blue-500 border-2 border-blue-500 text-white px-3 py-1 hover:bg-white hover:text-blue-500"
                onClick={() => {
                  setIsOpen(false);
                  fetchRow(100);
                }}
              >
                <X size={32} weight="bold" />
              </button>
            </div>
            <div className="flex px-9 py-3">
              <h3>
                Total de {quantityDisabled?.length} mesa(s) desabilitada(s).
              </h3>
            </div>
            <div className="flex justify-center align-center max-h-[800px] overflow-y-auto mb-10">
              <table
                className="
                  border-collapse 
                  border-[1px] 
                  border-slate-400
                  w-[90%]
                  bg-slate-100"
              >
                <thead>
                  <tr>
                    <th className="border border-slate-400 min-w-[100px] bg-gray-300">
                      Mesa
                    </th>
                    <th className="border border-slate-400 min-w-[100px] bg-gray-300">
                      Nº Fluig
                    </th>
                    <th className="border border-slate-400 min-w-[100px] bg-gray-300">
                      Desabilitada
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {disbledQuantity.map((c) => (
                    <tr>
                      <td className="border border-slate-400 h-[35px]">
                        <h3 className="text-center">{c.table}</h3>
                      </td>
                      <td className="border border-slate-400 h-[35px]">
                        <h3 className="text-center">{c.fluig_number}</h3>
                      </td>
                      <td className="border border-slate-400 h-[35px]">
                        <input
                          className={`w-full px-3 py-1 text-center`}
                          checked={c.disabled}
                          onChange={(event) =>
                            handleCheckboxChangeWrapper(event, c._id)
                          }
                          type="checkbox"
                          name="disabled"
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
