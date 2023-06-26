import { RowContext } from "@/context/RowContext";
import { useContext, useEffect, useState } from "react";

export default function TBody() {
  const {
    grayFilterWrapper,
    contador,
    change,
    changeSelect,
    handleDateChange,
    handleInputChangeWrapper,
    handleInputChangeRevision,
    handleSelectCampChange,
  } = useContext(RowContext);

  return (
    <tbody className="">
      {contador.map((c) => (
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
              onChange={(event) => handleInputChange(event, c._id)}
              value={c.line}
              name="line"
            ></input>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full px-3 py-1 text-center`}
              value={c.customer}
              onChange={(event) => handleInputChange(event, c._id)}
              name="customer"
            ></input>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full px-3 py-1 text-center`}
              value={c.fluig_number}
              onChange={(event) => handleInputChange(event, c._id)}
              name="fluig_number"
            ></input>
          </td>
          <td className="border border-slate-400 ...">
            <input
              className={`w-full px-3 py-1 text-center
                ${change(c.count_number) === "green" ? "bg-green-300" : ""}
                ${change(c.count_number) === "yellow" ? "bg-yellow-300" : ""}
                ${change(c.count_number) === "red" ? "bg-red-300" : ""}
                `}
              value={c.count_number}
              onChange={(event) => handleInputChange(event, c._id)}
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
                ${changeSelect(c.counter) === "green" ? "bg-green-300" : ""}
                ${changeSelect(c.counter) === "red" ? "bg-red-300" : ""}
                `}
              value={c.counter ? "sim" : "nao"}
              onChange={(event) => handleSelectCampChange(event, c._id)}
              name="counter"
            >
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </td>
          <td className="border border-slate-400 ...">
            <select
              className={`w-full h-[30px] text-center
                ${changeSelect(c.material) === "green" ? "bg-green-300" : ""}
                ${changeSelect(c.material) === "red" ? "bg-red-300" : ""}
                `}
              value={c.material ? "sim" : "nao"}
              onChange={(event) => handleSelectCampChange(event, c._id)}
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
              onChange={(event) => handleDateChange(event, c._id)}
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
          <td className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R0.ready === true ? "bg-blue-300" : ""}
                ${c.revision.R0.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.R0.ready}
                onChange={(event) => handleInputChange(event, c._id)}
                name=""
              ></input>
            </div>
          </td>
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center
                ${c.revision.R0.made === true ? "bg-blue-300" : ""}
                ${c.revision.R0.made === false ? "bg-red-300" : ""}
                
                `}
                value={c.revision.R0.made}
                onChange={(event) => handleInputChangeRevision(event, c._id)}
                name=""
              ></input>
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R0.date ? "bg-green-300" : ""}
                ${"23/07/2002" ? "bg-green-300" : ""}
                `}
                value={
                  c.revision.R0.made === false || c.revision.R0.ready === false
                    ? ""
                    : c.revision.R0.date
                    ? new Date(c.revision.R0.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(event) => handleDateChange(event, c._id)}
                name="revision.R0.date"
                type="date"
              ></input>
              {c.revision.R0.ready === false && (
                <div className="absolute top-[0px] w-full h-full opacity-50 bg-gray-500"></div>
              )}
            </div>
          </td>
          <td className="relative border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R30.ready === true ? "bg-blue-300" : ""}
                ${c.revision.R30.ready === false ? "bg-red-300" : ""}
                `}
                value={c.revision.R30.ready}
                onChange={(event) => handleInputChange(event, c._id)}
                name=""
              ></input>
              {grayFilterWrapper(c.revision.R0.made, c.revision.R0.ready) ===
                false && (
                <div className="absolute top-[0px] w-full h-full opacity-50 bg-gray-500"></div>
              )}
            </div>
          </td>
          <td className={`relative border border-slate-400`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center
                ${c.revision.R30.made === true ? "bg-blue-300" : ""}
                ${c.revision.R30.made === false ? "bg-red-300" : ""}
                
                `}
                value={c.revision.R30.made}
                onChange={(event) => handleInputChangeRevision(event, c._id)}
                name=""
              ></input>
              <input
                className={`w-full px-3 py-1 text-center 
                ${c.revision.R30.date ? "bg-green-300" : ""}
                ${"23/07/2002" ? "bg-green-300" : ""}
                `}
                value={c.revision.R30.made === false ? "" : c.revision.R30.date}
                onChange={(event) => handleInputChange(event, c._id)}
                name=""
                type="date"
              ></input>
              {c.revision.R30.ready === false && (
                <div className="absolute top-[0px] w-full h-full opacity-50 bg-gray-500"></div>
              )}
            </div>
          </td>
          <td className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center `}
                value={""}
                onChange={(event) => handleInputChange(event, c._id)}
                name=""
              ></input>
            </div>
          </td>
          <td className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center `}
                value={""}
                onChange={(event) => handleInputChange(event, c._id)}
                name=""
              ></input>
            </div>
          </td>
          <td className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center `}
                value={""}
                onChange={(event) => handleInputChange(event, c._id)}
                name=""
              ></input>
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
