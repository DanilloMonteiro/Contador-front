import { RowContext } from "@/context/RowContext";
import { Fragment, useContext } from "react";

export default function SecondTH() {
  const { data } = useContext(RowContext);

  const revisions = data ? data[0]?.revision : [];
  const revisions_time = data ? data[0]?.revision_time : [];

  return (
    <tr>
      <th
        className="border border-slate-400 min-w-[100px] bg-gray-300 "
        colSpan={1}
      >
        Mesa
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-gray-300">
        Linha
      </th>
      <th className="border border-slate-400 min-w-[120px] bg-gray-300">
        Cliente
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-gray-300">
        Nº FLUIG
      </th>
      <th className=" border border-slate-400 min-w-[200px] bg-gray-300">
        Número de ciclos
      </th>
      <th className=" border border-slate-400 min-w-[150px] bg-gray-300">
        Dias para revisão por tempo
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-gray-300">
        Mesa digital?
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-gray-300">
        Material disponivel?
      </th>
      <th className="border border-slate-400 min-w-[110px] bg-gray-300">
        Data planejada
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-gray-300">
        Observação
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-gray-300">
        Equipe
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-gray-200  ">
        Mac
      </th>
      <th className="border border-slate-400 min-w-[120px] bg-gray-200  ">
        Desabilitada
      </th>
      {revisions?.map((rev) => (
        <Fragment key={rev._id}>
          <th className="border border-slate-400 min-w-[100px] bg-blue-300  ">
            P
          </th>
          <th className="border border-slate-400 min-w-[100px] bg-green-300  ">
            R
          </th>
        </Fragment>
      ))}
      {revisions_time?.map((rev) => (
        <Fragment key={rev._id}>
          <th className="border border-slate-400 min-w-[100px] bg-blue-300  ">
            P
          </th>
          <th className="border border-slate-400 min-w-[100px] bg-green-300  ">
            R
          </th>
        </Fragment>
      ))}
    </tr>
  );
}
