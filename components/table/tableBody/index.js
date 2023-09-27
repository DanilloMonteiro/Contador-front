import { RowContext } from "@/context/RowContext";
import { Fragment, useContext } from "react";
import TdDefault from "./tdDefault";
import { ClockCountdown } from "@phosphor-icons/react";
import ContadorServices from "@/services/contador";

export default function TBody() {
  const { data, queryData, fetchRow } = useContext(RowContext);

  const handleDateChange = async (value, id, index, revType) => {
    try {
      let doc;
      console.log(index);
      if (index === 100) {
        doc = { planing_date: value };
      } else {
        console.log("entrou aqui");
        doc = {
          new_date: value,
          index: index,
          revType,
        };
        console.log(value, index, revType);
      }

      await ContadorServices.update(id, doc)
        .then((response) => {
          fetchRow(index);
          console.log("Resposta do serviço:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao atualizar o banco de dados:", error);
        });
    } catch (error) {
      console.error("Erro ao atualizar o banco de dados:", error);
    }
  };

  const handleBoxChange = async (value, id, index) => {
    try {
      let doc;

      console.log(value, "aqui value");

      doc = {
        disabled: value,
      };

      await ContadorServices.update(id, doc)
        .then((response) => {
          fetchRow(index);
          console.log("Resposta do serviço:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao atualizar o banco de dados:", error);
        });
    } catch (error) {
      console.error("Erro ao atualizar o banco de dados:", error);
    }
  };

  const handleChangeMaterial = async (value, id) => {
    try {
      let valor;
      if (value == "sim") {
        valor = true;
      } else {
        valor = false;
      }
      await ContadorServices.update(id, { material: valor })
        .then((response) => {
          fetchRow(100);
          console.log("Resposta do serviço:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao atualizar o banco de dados:", error);
        });
    } catch (error) {
      console.error("Erro ao atualizar o banco de dados:", error);
    }
  };

  const handleChangeDigital = async (value, id) => {
    try {
      let valor;
      if (value == "sim") {
        valor = true;
      } else {
        valor = false;
      }
      await ContadorServices.update(id, { digital_table: valor })
        .then((response) => {
          fetchRow(100);
          console.log("Resposta do serviço:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao atualizar o banco de dados:", error);
        });
    } catch (error) {
      console.error("Erro ao atualizar o banco de dados:", error);
    }
  };

  function digitalTable(disabled, digital_table) {
    if (disabled === true || digital_table === false) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <tbody>
      {queryData?.map((c) => (
        <tr
          key={c._id}
          className={`max-h-[200px]${
            c.digital_table === false ? "bg-gray-200" : "bg-white"
          }`}
        >
          <TdDefault
            disabled={c.disabled}
            value={c.table}
            name={"table"}
            readOnly
          />
          <TdDefault
            disabled={c.disabled}
            value={c.line}
            name={"line"}
            readOnly
          />
          <TdDefault
            disabled={c.disabled}
            value={c.customer}
            name={"customer"}
            readOnly
          />
          <TdDefault
            disabled={c.disabled}
            value={c.fluig_number}
            name={"fluig_number"}
            readOnly
          />
          <td className="border border-slate-400 relative">
            <input
              className={`w-full px-3 py-1 text-center ${
                c.count_number < c.next_revision ? "bg-green-300" : ""
              }
              ${c.count_number >= c.next_revision - 5000 ? "bg-yellow-300" : ""}
              ${c.count_number >= c.next_revision ? "bg-red-300" : ""}`}
              value={c.count_number}
              readOnly
              name="count_number"
            ></input>
            <div className="flex mx-10 gap-2 mt-1">
              <h3 className={`w-auto text-center`}>
                <ClockCountdown size={22} />
              </h3>
              <span>
                {c.last_count_date
                  ? new Date(c.last_count_date).toISOString().split("T")[0]
                  : ""}
              </span>
            </div>
            {digitalTable(c.disabled, c.digital_table) === true && (
              <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
            )}
          </td>
          <td className="border border-slate-400 relative">
            <input
              className={`w-full px-3 py-1 text-center ${
                c.date_revision > 30 ? "bg-green-300" : ""
              }
              ${c.date_revision <= 30 ? "bg-yellow-300" : ""}
              ${c.date_revision <= 0 ? "bg-red-300" : ""}`}
              value={c.date_revision}
              readOnly
              name="date_revision"
            ></input>
            {c.disabled === true && (
              <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
            )}
          </td>

          <td className=" border border-slate-400 relative">
            <select
              className={`w-full h-[30px] text-center ${
                c.digital_table === true ? "bg-green-300" : "bg-red-300"
              }`}
              value={c.digital_table ? "sim" : "nao"}
              name="digital_table"
              onChange={(e) => {
                handleChangeDigital(e.target.value, c._id);
              }}
            >
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
            {c.disabled === true && (
              <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
            )}
          </td>
          <td className="border border-slate-400 relative">
            <select
              className={`w-full h-[30px] text-center ${
                c.material === true ? "bg-green-300" : "bg-red-300"
              }`}
              value={c.material == true ? "sim" : "nao"}
              name="material"
              onChange={(e) => {
                handleChangeMaterial(e.target.value, c._id);
              }}
            >
              <option className="bg-white" value="sim">
                Sim
              </option>
              <option className="bg-white" value="nao">
                Não
              </option>
            </select>
            {c.disabled === true && (
              <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
            )}
          </td>
          <td className="border border-slate-400 relative">
            <input
              className={`w-full pr-2 py-1 text-center`}
              value={
                c.planing_date
                  ? new Date(c.planing_date).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => handleDateChange(e.target.value, c._id, 100)}
              name="planing_date"
              type="date"
            ></input>
            {c.disabled === true && (
              <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
            )}
          </td>
          <TdDefault
            disabled={c.disabled}
            value={c.observation}
            name="observation"
            readOnly
          />
          <TdDefault
            disabled={c.disabled}
            value={c.team}
            name="team"
            readOnly
          />
          <TdDefault
            disabled={c.disabled}
            value={c.board?.mac}
            name="map_esp32"
            readOnly
          />
          <td className={`relative border border-slate-400 relative`}>
            <div className="flex flex-row">
              <input
                className={`w-full px-3 py-1 text-center`}
                checked={c.disabled}
                onChange={(e) => handleBoxChange(e.target.checked, c._id, 100)}
                type="checkbox"
              ></input>
            </div>
          </td>
          {c.revision?.map((rev, index) => (
            <Fragment key={rev._id}>
              <td className="relative border border-slate-400">
                <div className="flex flex-row">
                  <input
                    className={`w-full px-3 py-1 text-center ${
                      rev.ready === true ? "bg-green-300" : "bg-red-300"
                    }`}
                    value={rev.ready === true ? "Sim" : "Não"}
                    readOnly
                  ></input>
                  {rev.ready_filter === true && (
                    <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
                  )}
                </div>
              </td>
              <td className={`relative border border-slate-400`}>
                <div className="flex flex-row">
                  <input
                    className={`w-full px-3 py-1 text-center 
                      ${rev.date !== null ? "bg-green-300" : "bg-red-300"}
                    `}
                    value={
                      rev.date
                        ? new Date(rev.date).toISOString().split("T")[0]
                        : null
                    }
                    onChange={(e) =>
                      handleDateChange(e.target.value, c._id, index, 0)
                    }
                    type="date"
                  ></input>
                  {rev.date_filter === true && (
                    <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
                  )}
                </div>
              </td>
            </Fragment>
          ))}

          {c.revision_time?.map((rev, index) => (
            <Fragment key={rev._id}>
              <td className="relative border border-slate-400">
                <div className="flex flex-row">
                  <input
                    className={`w-full px-3 py-1 text-center ${
                      rev.ready === true ? "bg-green-300" : "bg-red-300"
                    }`}
                    value={rev.ready === true ? "Sim" : "Não"}
                    readOnly
                  ></input>
                  {rev.ready_filter === true && (
                    <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
                  )}
                </div>
              </td>
              <td className={`relative border border-slate-400`}>
                <div className="flex flex-row">
                  <input
                    className={`w-full px-3 py-1 text-center 
                      ${rev.date !== null ? "bg-green-300" : "bg-red-300"}
                    `}
                    value={
                      rev.date
                        ? new Date(rev.date).toISOString().split("T")[0]
                        : null
                    }
                    onChange={(e) =>
                      handleDateChange(e.target.value, c._id, index, 1)
                    }
                    type="date"
                  ></input>
                  {rev.date_filter === true && (
                    <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
                  )}
                </div>
              </td>
            </Fragment>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
