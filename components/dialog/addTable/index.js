import { useContext, useState } from "react";

import { X } from "@phosphor-icons/react";
import { BoardContext } from "@/context/BoardContext";

import DialogMenu from "./dialogMenu";
import DialogPendingBoard from "./dialogPendingBoard";
import DialogCreateRow from "./dialogCreateRow";
import DialogChangeRow from "./dialogChangeRow";
import DialogConfirmChange from "./dialogConfimChange";
import { Toaster } from "react-hot-toast";
import DialogCreateRowMec from "./dialogCreateRowMec";

export default function DialogAddTable({ isOpen, setIsOpen }) {
  const {
    setIsOpenMenu,
    setIsOpenChangeRowMec,
    setIsOpenCreateRow,
    setIsOpenPendingBoard,
    setIsOpenChangeRow,
    setIsOpenConfirmChange,
  } = useContext(BoardContext);

  function closePage() {
    setIsOpenMenu(true);
    setIsOpenChangeRowMec(false);
    setIsOpenCreateRow(false);
    setIsOpenChangeRow(false);
    setIsOpenPendingBoard(false);
    setIsOpenConfirmChange(false);
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className="fixed opacity-40 bg-gray-300 w-full h-full"></div>
      )}
      {isOpen && (
        <div className="flex fixed bg-white w-1/2 h-[90vh] mt-[3vh] drop-shadow-xl z-10">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row w-auto h-auto">
              <p className="text-star font-rubik text-white text-2xl bg-blue-500 px-3 pt-2  w-full">
                Adicionar Mesa
              </p>
              <button
                className="bg-blue-500 border-2 border-blue-500 text-white px-3 py-1 hover:bg-white hover:text-blue-500"
                onClick={() => {
                  closePage();
                }}
              >
                <X size={32} weight="bold" />
              </button>
            </div>
            <div className="flex-col bg-white w-full h-full p-5">
              <DialogMenu />
              <DialogCreateRowMec />
              <DialogPendingBoard />
              <DialogCreateRow />
              <DialogChangeRow />
              <DialogConfirmChange />
            </div>
          </div>
        </div>
      )}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#3b82f6",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
