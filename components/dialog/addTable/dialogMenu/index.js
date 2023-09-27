import { useContext } from "react";
import { BoardContext } from "@/context/BoardContext";

export default function DialogMenu() {
  const {
    isOpenMenu,
    setIsOpenMenu,
    setIsOpenPendingBoard,
    fetchBoard,
    setIsOpenChangeRowMec,
  } = useContext(BoardContext);

  const OpenPendingMAC = () => {
    fetchBoard();
    setIsOpenPendingBoard(true);
    setIsOpenMenu(false);
  };

  const OpenCreateRowMec = () => {
    fetchBoard();
    setIsOpenChangeRowMec(true);
    setIsOpenMenu(false);
  };

  return (
    <>
      {isOpenMenu && (
        <>
          <div className="flex w-full h-auto gap-5">
            <div className="flex flex-col w-full h-auto bg-gray-200 p-2 ">
              <div className="flex flex-col w-full h-auto grow">
                <h1 className="text-lg text-black font-semibold pb-2">
                  Adicionar mesa mecânica
                </h1>
                <span>
                  Mesa mecanica não tem o contador entao somente consegue ser
                  feita a manutenção por tempo. (logo no lugar do campo de
                  contagem mostra o tempo restante para a procução preventiva)
                </span>
              </div>

              <div className="flex justify-between p-[1px] pt-3">
                <button
                  className="bg-blue-500 text-white p-2 font-semibold border-2 border-blue-500 hover:bg-white active:bg-blue-500 active:text-white hover:text-blue-500 rounded-sm"
                  onClick={() => {
                    OpenCreateRowMec();
                  }}
                >
                  Nova mesa
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full h-auto bg-gray-200 p-2">
              <div className="flex flex-col w-full grow ">
                <h1 className="text-lg text-black font-semibold pb-2">
                  Adicionar mesa digital
                </h1>
                <span>
                  Mesa digital tem contador então gera uma contagem. É
                  necessario ligar uma nova placa para receber a notificação
                  para criar ou modificar o MAC de uma mesa existente.
                </span>
              </div>

              <div className="flex mt-auto p-[1px] pt-3">
                <button
                  onClick={() => {
                    OpenPendingMAC();
                  }}
                  className="bg-blue-500 text-white p-2 font-semibold border-2 border-blue-500 hover:bg-white active:bg-blue-500 active:text-white hover:text-blue-500 rounded-sm"
                >
                  Placas pendentes
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white w-full h-auto"></div>
        </>
      )}
    </>
  );
}
