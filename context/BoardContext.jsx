import BoardServices from "@/services/board";
import React, { createContext, useState, useContext, useEffect } from "react";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);

  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isOpenPendingBoard, setIsOpenPendingBoard] = useState(false);
  const [isOpenCreateRow, setIsOpenCreateRow] = useState(false);
  const [isOpenChangeRow, setIsOpenChangeRow] = useState(false);
  const [isOpenConfirmChange, setIsOpenConfirmChange] = useState(false);

  const [actualBoardId, setActualBoardId] = useState("");
  const [actualBoardMac, setActualBoardMac] = useState("");

  const [actualTableMac, setActualTableMac] = useState("");

  async function fetchBoard() {
    const response = await BoardServices.index();
    if (response.data.length > 0) {
      console.log("aqui");
      console.log(response.data);
      setBoards(response.data);
    } else {
      setBoards([]);
      console.log("nao tem nenhuma placa");
    }
  }

  useEffect(() => {
    fetchBoard();
  }, []);
  return (
    <BoardContext.Provider
      value={{
        boards,
        fetchBoard,
        isOpenMenu,
        setIsOpenMenu,
        isOpenPendingBoard,
        setIsOpenPendingBoard,
        isOpenCreateRow,
        setIsOpenCreateRow,
        actualBoardId,
        setActualBoardId,
        actualBoardMac,
        setActualBoardMac,
        isOpenChangeRow,
        setIsOpenChangeRow,
        isOpenConfirmChange,
        setIsOpenConfirmChange,
        actualTableMac,
        setActualTableMac,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// Crie um hook personalizado para usar o contexto
// export function useCounter() {
//   const context = useContext(CounterContext);
//   if (!context) {
//     throw new Error('useCounter deve ser usado dentro de um CounterProvider');
//   }
//   return context;
// }
