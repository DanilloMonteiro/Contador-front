import { RowContext } from "@/context/RowContext";
import { useContext, useEffect, useState } from "react";
import { BoardContext } from "@/context/BoardContext";
import {
  ArrowClockwise,
  Eraser,
  FilePlus,
  Question,
  Trash,
} from "@phosphor-icons/react";
import BoardServices from "@/services/board";
import toast from "react-hot-toast";

export default function DialogPendingBoard() {
  const { fetchRow } = useContext(RowContext);
  const {
    boards,
    fetchBoard,
    setIsOpenMenu,
    setIsOpenChangeRow,
    setIsOpenCreateRow,
    isOpenPendingBoard,
    setIsOpenPendingBoard,
    setActualBoardId,
    setActualBoardMac,
  } = useContext(BoardContext);

  const [loading, setLoading] = useState(false);
  const [noBoards, setNoBoards] = useState(false);
  const [freeBoards, setFreeBoards] = useState([]);

  function lastPage() {
    setIsOpenMenu(true);
    setIsOpenPendingBoard(false);
  }

  function createRowPage(boardId, boardMac) {
    setIsOpenPendingBoard(false);
    setIsOpenCreateRow(true);
    setActualBoardId(boardId);
    setActualBoardMac(boardMac);
  }

  function changeRowPage(boardId, boardMac) {
    setIsOpenPendingBoard(false);
    setIsOpenChangeRow(true);
    setActualBoardId(boardId);
    setActualBoardMac(boardMac);
  }

  function noBoardsFuntion(board) {
    if (board.length == 0) {
      setNoBoards(true);
    } else {
      setNoBoards(false);
    }
  }

  const handleDeleteBoard = async (boardId) => {
    try {
      await BoardServices.delete(boardId)
        .then((response) => {
          toast.success("Placa apagada com sucesso!");
          console.log("Atualizacao de item no MongoDB feita com sucesso");
        })
        .catch((error) => {
          toast.error(
            "Erro ao excluir! Tente novamente ou contate o Administador",
            {
              duration: 4000,
            }
          );
          console.error(`Erro ao atualizar o item no banco de dados:`, error);
        });

      fetchRow(100);
      fetchBoard();
    } catch (error) {
      console.error("Erro ao excluir notificação:", error);
    }
    BoardsFree(boards);
  };

  async function uploadBoards() {
    await fetchBoard()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Erro ao buscar a lista:", error);
        setLoading(false);
      });
    BoardsFree(boards);
  }

  const BoardsFree = (boards) => {
    // Filtrar os boards com board.row vazio
    const freeBoardsArray = boards.filter((board) => {
      // return !board.row || Object.keys(board.row).length === 0;
      return board.board_free == true;
    });

    setFreeBoards(freeBoardsArray); // Defina o estado com os boards gratuitos
    noBoardsFuntion(freeBoardsArray);
  };

  useEffect(() => {
    setLoading(true);
    noBoardsFuntion(freeBoards);
    BoardsFree(boards);
  }, [fetchBoard, isOpenPendingBoard]);

  return (
    <>
      {isOpenPendingBoard && (
        <>
          <div className="flex w-full h-[80vh] flex-wrap">
            <div className="flex w-full mr-2 items-center">
              <h1 className="flex flex-wrap w-auto h-auto text-black font-semibold text-2xl pl-1">
                Contadores pendentes
              </h1>
              <div className="flex w-auto h-auto self-center items-center justify-center bg-gray-200 rounded-full mx-5">
                <Question className="mr-2 text-gray-600" size={35} />
                <FilePlus
                  className="text-blue-500 hover:bg-blue-200 rounded-full active:bg-blue-300 mx-1 hover:scale-110 transition-transform duration-300 ease-in-out"
                  size={25}
                />
                <Trash
                  className="text-red-500 hover:bg-red-200 rounded-full active:bg-red-300 mx-1 hover:scale-110 transition-transform duration-300 ease-in-out"
                  size={25}
                />
                <Eraser
                  className="text-gray-500 hover:bg-gray-300 rounded-full active:bg-gray-400 mx-1 hover:scale-110 transition-transform duration-300 ease-in-out"
                  size={25}
                />
              </div>
              <button
                className="flex flex-row relative ml-auto bg-white w-auto h-auto max-h-[32px] px-3 py-[2px] border-[2px] rounded-sm text-blue-600 font-semibold hover:bg-blue-500 hover:text-white border-blue-600 active:bg-white active:text-blue-600"
                onClick={() => {
                  uploadBoards();
                }}
              >
                <ArrowClockwise weight="bold" className="mt-[1px]" size={22} />
              </button>
            </div>

            <div className="flex-row w-full h-[65vh] py-5 overflow-y-auto mt-3">
              {loading === false ? (
                // Mostrar indicador de carregamento enquanto o fetch estiver em andamento
                <div className="text-center mt-5">Carregando...</div>
              ) : (
                // Renderizar a lista após o fetch ser concluído
                <div>
                  {freeBoards?.map((board, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 w-full h-auto bg-gray-200 p-2 mb-3 border-2 border-gray-200 hover:border-gray-400 "
                    >
                      <h3 className="col-span-9">Status: Placa sem mesa </h3>
                      <button className="ml-9 col-span-1">
                        <FilePlus
                          onClick={() => {
                            createRowPage(board._id, board.mac);
                          }}
                          className="text-blue-500 hover:bg-blue-200 rounded-full active:bg-blue-300"
                          size={25}
                        />
                      </button>
                      <button className="ml-7 col-span-1">
                        <Trash
                          onClick={() => handleDeleteBoard(board._id)}
                          className="text-red-500 hover:bg-red-200 rounded-full active:bg-red-300"
                          size={25}
                        />
                      </button>
                      <button className="ml-4 col-span-1">
                        <Eraser
                          onClick={() => {
                            changeRowPage(board._id, board.mac);
                          }}
                          className="text-gray-500 hover:bg-gray-300 rounded-full active:bg-gray-400"
                          size={25}
                        />
                      </button>
                      <h4 className="col-span-12">MAC: {board.mac}</h4>
                      <span className="col-span-12">
                        Data: {board.data_free}
                      </span>
                    </div>
                  ))}
                  {noBoards == true && (
                    <div className="grid grid-cols-12 w-full max-h-[100px] h-auto justify-start bg-gray-200 p-2">
                      <h1 className="col-span-12">
                        Não ha placas pendentes, todas as placas tem uma mesa.
                      </h1>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                lastPage();
              }}
              className="flex flex-row relative items-center bg-white w-auto h-auto px-3 py-[2px] mt-3 border-[2px] rounded-sm text-blue-600 font-semibold hover:bg-blue-500 hover:text-white border-blue-600"
            >
              Voltar
            </button>
          </div>
        </>
      )}
    </>
  );
}
