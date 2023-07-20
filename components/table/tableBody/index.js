import { RowContext } from "@/context/RowContext";
import { useContext } from "react";
import TdDefault from "./tdDefault";

export default function TBody() {
  const {
    isFilterActive1,
    contador,
    changeColorCounterWrapper,
    changeColorSelectWrapper,
    handleDateChangeRevisionWrapper,
    handleSimpleSelectChangeWrapper,
    handleCheckboxChangeWrapper2,
    handleChangeFilterWrapper,
    handleInputChangeWrapper,
    handleDateChangeWrapper,
    handleSelectChangeWrapper,
    handleDateChangeRevisionWrapper2,
  } = useContext(RowContext);

  return (
    <tbody>
      {contador?.map((c) => (
        <tr
          key={c._id}
          className={`${
            c.digital_table === false ? "bg-gray-200" : "bg-white"
          }`}
        >
          <TdDefault value={c.table} name={"table"} readOnly />
          <TdDefault value={c.line} name={"line"} readOnly />
          <TdDefault value={c.customer} name={"customer"} readOnly />
          <TdDefault value={c.fluig_number} name={"fluig_number"} readOnly />
          <td className="border border-slate-400 ">
            <input
              className={`w-full px-3 py-1 text-center
                ${
                  changeColorCounterWrapper(c) === "green" ? "bg-green-300" : ""
                }
                ${
                  changeColorCounterWrapper(c) === "yellow"
                    ? "bg-yellow-300"
                    : ""
                }
                ${changeColorCounterWrapper(c) === "red" ? "bg-red-300" : ""}
                `}
              value={c.count_number}
              onChange={(event) => handleInputChangeWrapper(event, c._id)}
              name="count_number"
            ></input>
            <label>
              <h3 className={`w-full py-0 text-center`}>Ultima contagem:</h3>
            </label>
            <input
              className={`w-full px-3 py-0 text-center`}
              value={
                c.last_count_number
                  ? new Date(c.last_count_number).toISOString().split("T")[0]
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
          <td className=" border border-slate-400 ...">
            <select
              className={`w-full h-[30px] text-center
                ${
                  changeColorSelectWrapper(c.digital_table) === "green"
                    ? "bg-green-300"
                    : ""
                }
                ${
                  changeColorSelectWrapper(c.digital_table) === "red"
                    ? "bg-red-300"
                    : ""
                }
                `}
              value={c.digital_table ? "sim" : "nao"}
              onChange={(event) =>
                handleSimpleSelectChangeWrapper(event, c._id)
              }
              name="digital_table"
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
          <TdDefault
            value={c.observation}
            onChange={(event) => handleInputChangeWrapper(event, c._id)}
            name="observation"
          />
          <TdDefault value={c.team} name="team" readOnly />
          <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R0.ready === true ? "bg-blue-300" : ""}
                ${c.revision.R0.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.R0.ready === true ? "Sim" : "Não"}
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
                value={c.revision?.R30?.ready === true ? "Sim" : "Não"}
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
            data-name="revision.R30.date_filter"
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
                value={c.revision.R55.ready === true ? "Sim" : "Não"}
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
                value={c.revision.R80.ready === true ? "Sim" : "Não"}
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
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center`}
                checked={c.desabled}
                onChange={(event) => handleCheckboxChangeWrapper2(event, c._id)}
                type="checkbox"
                name="desabled"
              ></input>
            </div>
          </td>
          <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.time1.ready === true ? "bg-blue-300" : ""}
                ${c.revision.time1.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.time1.ready === true ? "Sim" : "Não"}
                readOnly
              ></input>
              {c.revision.time1.ready_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.time1.date ? "bg-green-300" : "bg-red-300"}
                `}
                value={
                  c.revision.time1.date
                    ? new Date(c.revision.time1.date)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(event) =>
                  handleDateChangeRevisionWrapper2(event, c._id)
                }
                name="revision.time1.date"
                type="date"
              ></input>
              {c.revision.time1.date_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.time2.ready === true ? "bg-blue-300" : ""}
                ${c.revision.time2.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.time2.ready === true ? "Sim" : "Não"}
                readOnly
              ></input>
              {c.revision.time2.ready_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.time2.date ? "bg-green-300" : "bg-red-300"}
                `}
                value={
                  c.revision.time2.date
                    ? new Date(c.revision.time2.date)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(event) =>
                  handleDateChangeRevisionWrapper2(event, c._id)
                }
                name="revision.time2.date"
                type="date"
              ></input>
              {c.revision.time2.date_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.time3.ready === true ? "bg-blue-300" : ""}
                ${c.revision.time3.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.time3.ready === true ? "Sim" : "Não"}
                readOnly
              ></input>
              {c.revision.time3.ready_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.time3.date ? "bg-green-300" : "bg-red-300"}
                `}
                value={
                  c.revision.time3.date
                    ? new Date(c.revision.time3.date)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(event) =>
                  handleDateChangeRevisionWrapper2(event, c._id)
                }
                name="revision.time3.date"
                type="date"
              ></input>
              {c.revision.time3.date_filter === true && (
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
