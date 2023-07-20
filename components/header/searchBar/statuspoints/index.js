import { RowContext } from "@/context/RowContext";
import { useContext } from "react";

export default function StatusPoints() {
  const { camposAmarelos, camposVermelhos, habilitados2 } =
    useContext(RowContext);

  const restante = camposAmarelos.length + camposVermelhos.length;

  const camposVerdes = habilitados2.length - restante;

  return (
    <>
      <div className="flex gap-5 mr-8">
        <div className="flex gap-2">
          <div className="mt-[9px] w-[10px] h-[10px] rounded-full bg-green-500"></div>
          <h4 className="text-lg">{camposVerdes}</h4>
        </div>
        <div className="flex gap-2">
          <div className="mt-[9px] w-[10px] h-[10px] rounded-full bg-yellow-500"></div>
          <h4 className="text-lg">{camposAmarelos.length}</h4>
        </div>
        <div className="flex gap-2">
          <div className="mt-[9px] w-[10px] h-[10px] rounded-full bg-red-500"></div>
          <h4 className="text-lg">{camposVermelhos.length}</h4>
        </div>
      </div>
    </>
  );
}
