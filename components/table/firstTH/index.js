import { RowContext } from "@/context/RowContext";
import { Fragment, useContext } from "react";

export default function FirstTR() {
  const { data } = useContext(RowContext);

  const revisions = data ? data[0]?.revision : [];
  const revisions_time = data ? data[0]?.revision_time : [];

  return (
    <tr>
      <th
        className="border border-slate-500 min-w-[100px] bg-gray-400"
        colSpan={11}
      >
        Planejamento Preventiva
      </th>
      <th
        className="border border-slate-500 min-w-[200px] bg-gray-400"
        colSpan={1}
      >
        Mac
      </th>
      <th
        className="border border-slate-500 min-w-[100px] bg-gray-400"
        colSpan={1}
      >
        Desabilitada
      </th>
      {revisions?.map((rev) => (
        <Fragment key={rev._id}>
          <th
            className="border border-slate-500 min-w-[100px] bg-gray-400"
            colSpan={2}
          >
            {rev.stop}
          </th>
        </Fragment>
      ))}

      {revisions_time?.map((rev) => (
        <Fragment key={rev._id}>
          <th
            className="border border-slate-500 min-w-[100px] bg-gray-400"
            colSpan={2}
          >
            {rev.code}
          </th>
        </Fragment>
      ))}
    </tr>
  );
}
