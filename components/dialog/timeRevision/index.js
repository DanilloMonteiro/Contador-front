import { RowContext } from "@/context/RowContext";
import { X } from "@phosphor-icons/react";
import { useContext } from "react";

export default function DialogTimeRevision({ isOpen, setIsOpen }) {
  const { contador, changeColorCounterWrapper, fetchContador } =
    useContext(RowContext);
  return (
    <>
      {isOpen && (
        <div className="fixed opacity-40 bg-gray-300 w-full h-full z-10"></div>
      )}
      {isOpen && (
        <div className="fixed bg-white w-1/2 h-[90vh] mt-[3vh] drop-shadow-xl z-10">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row">
              <p className="text-star font-rubik text-white text-2xl bg-blue-500 px-3 pt-2  w-full">
                Revisão por tempo (1 ano)
              </p>
              <button
                className="bg-blue-500 border-2 border-blue-500 text-white px-3 py-1 hover:bg-white hover:text-blue-500"
                onClick={() => {
                  setIsOpen(false);
                  fetchContador();
                }}
              >
                <X size={32} weight="bold" />
              </button>
            </div>
            <div className="flex justify-center align-center max-h-[800px] overflow-y-auto my-10">
              <table
                className="
                  border-collapse 
                  border 
                  border-slate-400
                  w-[90%]
                  bg-white"
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
                      Dias restantes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contador.map((c) => (
                    <tr key={c._id}>
                      <td className="border border-slate-400 h-[35px]">
                        <h3 className="text-center">{c.table}</h3>
                      </td>
                      <td className="border border-slate-400 h-[35px]">
                        <h3 className="text-center">{c.fluig_number}</h3>
                      </td>
                      <td
                        className={`border border-slate-400 h-[35px] ${
                          changeColorCounterWrapper(c) === "green"
                            ? "bg-green-300"
                            : ""
                        }
                      ${
                        changeColorCounterWrapper(c) === "yellow"
                          ? "bg-yellow-300"
                          : ""
                      }
                      ${
                        changeColorCounterWrapper(c) === "red"
                          ? "bg-red-300"
                          : ""
                      }`}
                      >
                        <h3 className="text-center">{c.date_revision}</h3>
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
