import DialogAddTable from "@/components/dialog/addTable";
import DialogDisableTable from "@/components/dialog/disableTable";
import DialogTimeRevision from "@/components/dialog/timeRevision";
import StatusPoints from "./statuspoints";
import Button from "@/components/button";
import SearchInput from "./searchInput";

import { RowContext } from "@/context/RowContext";
import { useContext, useState } from "react";
import DialogNotification from "@/components/dialog/notifications";

export default function SearchBar() {
  const { fetchContador, notifications } = useContext(RowContext);

  const [isOpenAddTable, setIsOpenAddTable] = useState(false);
  const [isOpenTimeRevision, setIsOpenTimeRevision] = useState(false);
  const [isOpenDisableTable, setIsOpenDisableTable] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  return (
    <>
      <div className="flex flex-row bg-blue-300 w-screen h-[100px] px-8 items-center">
        <SearchInput />
        <div className="flex flex-wrap justify-center align-center ml-auto ">
          <StatusPoints />
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setIsOpenNotification(true);
                fetchContador();
              }}
              length={notifications.length}
              bell
            />
            <Button
              onClick={() => {
                setIsOpenDisableTable(true);
              }}
              name={"Mesas Desabilitadas"}
            />
            <Button
              onClick={() => {
                setIsOpenTimeRevision(true);
              }}
              name={"Revisão por tempo"}
            />
            <Button
              onClick={() => {
                setIsOpenAddTable(true);
              }}
              name={"Adicionar mesa"}
            />
            <Button onClick={fetchContador} arrowReload />
          </div>
        </div>
      </div>
      <DialogAddTable isOpen={isOpenAddTable} setIsOpen={setIsOpenAddTable} />
      <DialogTimeRevision
        isOpen={isOpenTimeRevision}
        setIsOpen={setIsOpenTimeRevision}
      />
      <DialogDisableTable
        isOpen={isOpenDisableTable}
        setIsOpen={setIsOpenDisableTable}
      />
      <DialogNotification
        isOpen={isOpenNotification}
        setIsOpen={setIsOpenNotification}
      />
    </>
  );
}
