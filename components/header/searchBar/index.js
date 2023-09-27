import DialogAddTable from "@/components/dialog/addTable";
import DialogDisableTable from "@/components/dialog/disableTable";
import DialogTimeRevision from "@/components/dialog/timeRevision";
import StatusPoints from "./statuspoints";
import Button from "@/components/button";
import SearchInput from "./searchInput";

import { RowContext } from "@/context/RowContext";
import { useContext, useState } from "react";
import DialogNotification from "@/components/dialog/notifications";
import DialogFilter from "@/components/dialog/filter";

export default function SearchBar() {
  const { fetchRow, notifications, fetchNotifications } =
    useContext(RowContext);

  const [isOpenAddTable, setIsOpenAddTable] = useState(false);
  const [isOpenTimeRevision, setIsOpenTimeRevision] = useState(false);
  const [isOpenDisableTable, setIsOpenDisableTable] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function patchData() {
    setIsButtonDisabled(true); // Desativa o botão ao clicar
    setTimeout(() => {
      setIsButtonDisabled(false);

      // Reativa o botão após 5 segundos
    }, 5000);

    fetchRow(100);
    fetchNotifications();
  }

  return (
    <>
      <div className="flex flex-row bg-blue-300 w-screen h-[100px] px-8 items-center">
        <div className="flex gap-5">
          <SearchInput />
          <button
            className="flex flex-row relative bg-white w-auto h-auto px-3 py-[2px] border-[2px] transition-colors duration-500 rounded-sm text-blue-600 font-semibold hover:bg-blue-500 hover:text-white border-blue-600 active:bg-white active:text-blue-600"
            onClick={() => {
              setIsOpenFilter(true);
            }}
          >
            Filtrar
          </button>
        </div>

        <div className="flex flex-wrap justify-center align-center ml-auto ">
          <StatusPoints />
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setIsOpenNotification(true);
                fetchRow(100);
              }}
              length={notifications.length}
              bell
            />
            {/* <Button
              onClick={() => {
                setIsOpenDisableTable(true);
              }}
              name={"Mesas Desabilitadas"}
            /> */}
            <Button
              onClick={() => {
                setIsOpenAddTable(true);
              }}
              name={"Adicionar mesa"}
            />
            <Button
              onClick={() => patchData()}
              arrowReload
              disabled={isButtonDisabled}
            />
          </div>
        </div>
      </div>
      <DialogAddTable isOpen={isOpenAddTable} setIsOpen={setIsOpenAddTable} />
      {/* <DialogTimeRevision
        isOpen={isOpenTimeRevision}
        setIsOpen={setIsOpenTimeRevision}
      /> */}
      <DialogDisableTable
        isOpen={isOpenDisableTable}
        setIsOpen={setIsOpenDisableTable}
      />
      <DialogNotification
        isOpen={isOpenNotification}
        setIsOpen={setIsOpenNotification}
      />
      <DialogFilter isOpen={isOpenFilter} setIsOpen={setIsOpenFilter} />
    </>
  );
}
