import { RowContext } from "@/context/RowContext";
import { useContext, useState } from "react";

export default function TBody() {
  const {
    isFilterActive1,
    setFilterActive1,
    checkR0,
    dataCheck,
    contador,
    changeColorCounterWrapper,
    changeColorSelectWrapper,
    handleDateChangeRevisionWrapper,
    handleChangeFilterWrapper,
    handleInputChangeWrapper,
    handleDateChangeWrapper,
    handleSelectChangeWrapper,
  } = useContext(RowContext);

  const [isFilterActive2, setFilterActive2] = useState(true);
  const [isFilterActive3, setFilterActive3] = useState(true);
  const [isFilterActive4, setFilterActive4] = useState(true);

  return (
    <tbody>
      {contador?.map((c) => (
        <tr key={c._id}>
          <td className="border border-slate-400 h-[35px]">
            <input
              className={`w-full px-3 text-black py-1 text-center`}
              value={c.table}
              onChange={(event) => handleInputChangeWrapper(event, c._id)}
              name="table"
            ></input>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full px-3 py-1 text-center`}
              onChange={(event) => handleInputChangeWrapper(event, c._id)}
              value={c.line}
              name="line"
            ></input>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full px-3 py-1 text-center`}
              value={c.customer}
              onChange={(event) => handleInputChangeWrapper(event, c._id)}
              name="customer"
            ></input>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full px-3 py-1 text-center`}
              value={c.fluig_number}
              onChange={(event) => handleInputChangeWrapper(event, c._id)}
              name="fluig_number"
            ></input>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full px-3 py-1 text-center
                ${
                  changeColorCounterWrapper(
                    c.count_number,
                    c.revision.R0.checked,
                    c.revision.R30.checked,
                    c.revision.R55.checked,
                    c.revision.R80.checked,
                    c.revision.R105.checked
                  ) === "green"
                    ? "bg-green-300"
                    : ""
                }
                ${
                  changeColorCounterWrapper(
                    c.count_number,
                    c.revision.R0.checked,
                    c.revision.R30.checked,
                    c.revision.R55.checked,
                    c.revision.R80.checked,
                    c.revision.R105.checked
                  ) === "yellow"
                    ? "bg-yellow-300"
                    : ""
                }
                ${
                  changeColorCounterWrapper(
                    c.count_number,
                    c.revision.R0.checked,
                    c.revision.R30.checked,
                    c.revision.R55.checked,
                    c.revision.R80.checked,
                    c.revision.R105.checked
                  ) === "red"
                    ? "bg-red-300"
                    : ""
                }
                `}
              value={c.count_number}
              onChange={(event) => handleInputChangeWrapper(event, c._id)}
              name="count_number"
            ></input>
            <input
              className={`w-full px-3 py-1 text-center`}
              value={
                c.updated_at
                  ? new Date(c.updated_at).toISOString().split("T")[0]
                  : ""
              }
              readOnly
              name="updated_at"
            ></input>
          </td>
          <td className=" border border-slate-400 ...">
            <select
              className={`w-full h-[30px] text-center
                ${
                  changeColorSelectWrapper(c.counter) === "green"
                    ? "bg-green-300"
                    : ""
                }
                ${
                  changeColorSelectWrapper(c.counter) === "red"
                    ? "bg-red-300"
                    : ""
                }
                `}
              value={c.counter ? "sim" : "nao"}
              onChange={(event) => handleSelectChangeWrapper(event, c._id)}
              name="counter"
            >
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </td>
          <td className="border border-slate-400 ...">
            <select
              className={`w-full h-[30px] text-center
                ${
                  changeColorSelectWrapper(c.material) === "green"
                    ? "bg-green-300"
                    : ""
                }
                ${
                  changeColorSelectWrapper(c.material) === "red"
                    ? "bg-red-300"
                    : ""
                }
                `}
              value={c.material ? "sim" : "nao"}
              onChange={(event) => handleSelectChangeWrapper(event, c._id)}
              name="material"
            >
              <option className="bg-white" value="sim">
                Sim
              </option>
              <option className="bg-white" value="nao">
                Não
              </option>
            </select>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full pr-2 py-1 text-center`}
              value={
                c.planing_date
                  ? new Date(c.planing_date).toISOString().split("T")[0]
                  : ""
              }
              onChange={(event) => handleDateChangeWrapper(event, c._id)}
              name="planing_date"
              type="date"
            ></input>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full px-3 py-1 text-center`}
              value={c.observation}
              onChange={(event) => handleInputChange(event, c._id)}
              name="observarion"
            ></input>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full px-3 py-1 text-center`}
              value={c.team}
              onChange={(event) => handleInputChange(event, c._id)}
              name="team"
            ></input>
          </td>
          <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R0.ready === true ? "bg-blue-300" : ""}
                ${c.revision.R0.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.R0.ready}
                readOnly
              ></input>
              {c.revision.R0.ready_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R0.date ? "bg-green-300" : "bg-green-300"}
                `}
                value={
                  c.revision.R0.date
                    ? new Date(c.revision.R0.date).toISOString().split("T")[0]
                    : "2023-06-29"
                }
                readOnly
                type="date"
              ></input>
              {c.revision.R0.ready_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${
                  c.revision?.R30?.ready === true ? "bg-blue-300" : "bg-red-300"
                }
                `}
                value={c.revision?.R30?.ready}
                readOnly
              ></input>
              {c.revision.R30.ready_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td
            className={`relative border border-slate-400`}
            onClick={(event) =>
              handleChangeFilterWrapper(event, c.revision.R30.checked, c._id)
            }
            name="revision.R30.date"
          >
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision?.R30?.date ? "bg-green-300" : "bg-red-300"}
                `}
                value={
                  c.revision?.R30?.date
                    ? new Date(c.revision?.R30?.date)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(event) =>
                  handleDateChangeRevisionWrapper(event, c._id)
                }
                name="revision.R30.date"
                type="date"
              ></input>
              {isFilterActive1 && c.revision.R30.date_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R55.ready === true ? "bg-blue-300" : ""}
                ${c.revision.R55.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.R55.ready}
                readOnly
              ></input>
              {c.revision.R55.ready_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R55.date ? "bg-green-300" : "bg-red-300"}
                `}
                value={
                  c.revision.R55.date
                    ? new Date(c.revision.R55.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(event) =>
                  handleDateChangeRevisionWrapper(event, c._id)
                }
                name="revision.R55.date"
                type="date"
              ></input>
              {c.revision.R55.date_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R80.ready === true ? "bg-blue-300" : ""}
                ${c.revision.R80.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.R80.ready}
                readOnly
              ></input>
              {c.revision.R80.ready_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R80.date ? "bg-green-300" : "bg-red-300"}
                `}
                value={
                  c.revision.R80.date
                    ? new Date(c.revision.R80.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(event) =>
                  handleDateChangeRevisionWrapper(event, c._id)
                }
                name="revision.R80.date"
                type="date"
              ></input>
              {c.revision.R80.date_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

let lastCallDate = null; // Variável para armazenar a data da última chamada

function triggerAlert() {
  const currentDate = new Date();

  if (!lastCallDate) {
    // Se é a primeira chamada, armazene a data atual e retorne
    lastCallDate = currentDate;
    return;
  }

  const oneYearInMillis = 365 * 24 * 60 * 60 * 1000; // 1 ano em milissegundos
  const elapsedTime = currentDate - lastCallDate;

  if (elapsedTime >= oneYearInMillis) {
    // Se um ano se passou, dispare o alerta
    alert("Um ano se passou desde a última chamada!");
  }

  // Atualize a data da última chamada para a data atual
  lastCallDate = currentDate;
}

{
  /* <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R0.ready === true ? "bg-blue-300" : ""}
                ${c.revision.R0.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.R0.ready}
                readOnly
              ></input>
              {c.revision.R0.ready_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R0.date ? "bg-green-300" : "bg-red-300"}
                `}
                value={
                  c.revision.R0.date
                    ? new Date(c.revision.R0.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(event) =>
                  handleDateChangeRevisionWrapper(event, c._id)
                }
                name="revision.R0.date"
                type="date"
              ></input>
              {c.revision.R0.date_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td> */
}
