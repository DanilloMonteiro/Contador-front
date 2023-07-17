import { RowContext } from "@/context/RowContext";
import { useContext } from "react";

export default function SecondTH() {
  const { handleFilterChangeWrapper } = useContext(RowContext);
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
      <th className=" flex flex-col items-center border border-slate-400 min-w-[200px] bg-gray-300">
        <h1 className="p-1">Número de ciclos</h1>
        <div className="flex flex-row">
          <select
            className="w-[70px] h-[30px] m-2"
            onChange={handleFilterChangeWrapper}
          >
            <option value="all">Todos</option>
            <option value="yellow">Amarelo</option>
            <option value="red">Vermelho</option>
          </select>
          <select
            className="w-[70px] h-[30px] m-2"
            onChange={handleFilterChangeWrapper}
          >
            <option value="maior">Maior</option>
            <option value="menor">Menor</option>
          </select>
        </div>
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-gray-300">
        Contador?
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
      <th className="border border-slate-400 min-w-[100px] bg-blue-300  ">P</th>
      <th className="border border-slate-400 min-w-[100px] bg-green-300  ">
        R
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-blue-300  ">P</th>
      <th className="border border-slate-400 min-w-[100px] bg-green-300  ">
        R
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-blue-300  ">P</th>
      <th className="border border-slate-400 min-w-[100px] bg-green-300  ">
        R
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-blue-300  ">P</th>
      <th className="border border-slate-400 min-w-[100px] bg-green-300  ">
        R
      </th>
      <th className="border border-slate-400 min-w-[120px] bg-gray-300  ">
        Desabilitada
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-blue-300  ">P</th>
      <th className="border border-slate-400 min-w-[100px] bg-green-300  ">
        R
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-blue-300  ">P</th>
      <th className="border border-slate-400 min-w-[100px] bg-green-300  ">
        R
      </th>
      <th className="border border-slate-400 min-w-[100px] bg-blue-300  ">P</th>
      <th className="border border-slate-400 min-w-[100px] bg-green-300  ">
        R
      </th>
    </tr>
  );
}
