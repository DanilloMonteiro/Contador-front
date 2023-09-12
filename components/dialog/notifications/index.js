import { RowContext } from "@/context/RowContext";
import NotificationServices from "@/services/notification";
import { X } from "@phosphor-icons/react";
import { useContext } from "react";

export default function DialogNotification({ isOpen, setIsOpen }) {
  const { fetchContador, notifications } = useContext(RowContext);

  const handleDeleteNotification = async (notificationId) => {
    try {
      await NotificationServices.delete(notificationId);
      fetchContador();
    } catch (error) {
      console.error("Erro ao excluir notificação:", error);
    }
  };

  const handleCloseNotifications = () => {
    setIsOpen(false);
    fetchContador();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed opacity-40 bg-gray-300 w-full h-full z-10"></div>
      )}
      {isOpen && (
        <div className="flex fixed bg-white w-1/2 h-[90vh] mt-[3vh] drop-shadow-xl z-10">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row ">
              <p className="text-star font-rubik text-white text-2xl bg-blue-500 px-3 pt-2  w-full">
                Notificações
              </p>
              <button
                className="bg-blue-500 border-2 border-blue-500 text-white px-3 py-1 hover:bg-white hover:text-blue-500"
                onClick={() => handleCloseNotifications()}
              >
                <X size={32} weight="bold" />
              </button>
            </div>
            <div className="flex relative flex-col font-rubik max-h-[800px] gap-4 overflow-auto mx-7 my-4 ">
              {notifications.map((notification) => (
                <div className="flex flex-col w-full h-auto bg-slate-100 py-3 pl-3">
                  <div className="flex items-center">
                    <h1 className="text-lg">{notification?.title}</h1>
                    <span className="text-sm ml-10">{notification?.table}</span>
                    <span className="text-sm ml-5">
                      Fluig: {notification?.fluig}
                    </span>
                    <button
                      className="text-red-500 px-4 ml-auto hover:text-red-800"
                      onClick={() => handleDeleteNotification(notification._id)}
                    >
                      <X size={22} weight="bold" />
                    </button>
                  </div>

                  <span className="text-md text-slate-600 p-2">
                    {notification?.body}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
