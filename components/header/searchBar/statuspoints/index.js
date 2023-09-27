import { RowContext } from "@/context/RowContext";
import { useContext, useEffect, useState } from "react";

export default function StatusPoints() {
  const { queryData, fetchRow } = useContext(RowContext);

  const [redQuantity, setRedQuantity] = useState([]);
  const [yellowQuantity, setYellowQuantity] = useState([]);
  const [greenQuantity, setGreenQuantity] = useState([]);

  function quantityStatus() {
    const redItems = queryData.filter((item) => item.count_status === "red");
    const yellowItems = queryData.filter(
      (item) => item.count_status === "yellow"
    );
    const greenItems = queryData.filter(
      (item) => item.count_status === "green"
    );

    setRedQuantity(redItems);
    setGreenQuantity(greenItems);
    setYellowQuantity(yellowItems);

    console.log(redQuantity, greenQuantity, yellowQuantity, "items");
  }

  useEffect(() => {
    quantityStatus();
  }, [fetchRow]);

  return (
    <>
      <div className="flex gap-5 mr-8">
        <div className="flex gap-2">
          <div className="mt-[9px] w-[10px] h-[10px] rounded-full bg-green-500"></div>
          <h4 className="text-lg">{greenQuantity?.length}</h4>
        </div>
        <div className="flex gap-2">
          <div className="mt-[9px] w-[10px] h-[10px] rounded-full bg-yellow-500"></div>
          <h4 className="text-lg">{yellowQuantity?.length}</h4>
        </div>
        <div className="flex gap-2">
          <div className="mt-[9px] w-[10px] h-[10px] rounded-full bg-red-500"></div>
          <h4 className="text-lg">{redQuantity?.length}</h4>
        </div>
      </div>
    </>
  );
}
