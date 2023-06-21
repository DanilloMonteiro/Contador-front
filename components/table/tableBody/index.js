export default function TBody({ contador, change }) {
  return (
    <tbody>
      {contador.map((c) => (
        <tr key={c._id} className="tr-height-limiter">
          <td id={c._id} className="border border-slate-400 h-[35px]">
            <input
              className={`
                w-full 
                px-3 
                text-black
                py-1 
                text-center
                `}
              value={c.mesa}
              name="mesa"
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <input
              className={`
                w-full 
                px-3 
                py-1 
                text-center
                `}
              readOnly
              value={c.linha}
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <input
              className={`
                w-full 
                px-3 
                py-1 
                text-center
                `}
              value={c.cliente}
              readOnly
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <input
              className={`
                w-full 
                px-3 
                py-1 
                text-center
                `}
              value={c.nFluig}
              readOnly
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <input
              className={`
                w-full 
                px-3 
                py-1 
                text-center
                ${change(c.nCiclos) === "green" ? "bg-green-300" : ""}
                ${change(c.nCiclos) === "yellow" ? "bg-yellow-300" : ""}
                ${change(c.nCiclos) === "red" ? "bg-red-300" : ""}
                `}
              value={c.nCiclos}
              readOnly
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <input
              className={`
                w-full 
                px-3 
                py-1 
                text-center
                `}
              value={c.contador}
              readOnly
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <input
              className={`
                w-full 
                px-3 
                py-1 
                text-center
                `}
              value={c.materialDisp}
              readOnly
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <input
              className={`
                w-full 
                px-3 
                py-1 
                text-center
                `}
              value={""}
              readOnly
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <input
              className={`
                w-full 
                px-3 
                py-1 
                text-center
                `}
              value={""}
              readOnly
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <input
              className={`
                w-full 
                px-3 
                py-1 
                text-center
                `}
              value={""}
              readOnly
            ></input>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`
                  w-full 
                  px-3 
                  py-1 
                  text-center
                  bg-blue-300
                  `}
                value={"P"}
                readOnly
              ></input>
            </div>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`
                  w-full 
                  px-3 
                  py-1 
                  text-center
                  bg-green-300
                  `}
                value={""}
                readOnly
              ></input>
            </div>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`
                  w-full 
                  px-3 
                  py-1 
                  text-center
                  bg-blue-300
                  `}
                value={"P"}
                readOnly
              ></input>
            </div>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`
                  w-full 
                  px-3 
                  py-1 
                  text-center
                  bg-green-300
                  `}
                value={""}
                readOnly
              ></input>
            </div>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`
                  w-full 
                  px-3 
                  py-1 
                  text-center
                  bg-blue-300
                  `}
                value={"P"}
                readOnly
              ></input>
            </div>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`
                  w-full 
                  px-3 
                  py-1 
                  text-center
                  bg-green-300
                  `}
                value={""}
                readOnly
              ></input>
            </div>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`
                  w-full 
                  px-3 
                  py-1 
                  text-center
                  bg-blue-300
                  `}
                value={"P"}
                readOnly
              ></input>
            </div>
          </td>
          <td id={c.id} className="border border-slate-400 ...">
            <div className="flex flex-row">
              <input
                className={`
                  w-full 
                  px-3 
                  py-1 
                  text-center
                  bg-green-300
                  `}
                value={""}
                readOnly
              ></input>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
