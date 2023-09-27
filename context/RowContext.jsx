import useItemUpdater from "@/hooks/useItemUpdater";
import ContadorServices from "@/services/contador";
import NotificationServices from "@/services/notification";
import { createContext, useState, useEffect } from "react";

export const RowContext = createContext();

export const RowProvider = ({ children }) => {
  const [data, setData] = useState([]); // Estado para armazenar os dados, inicializado como null
  const [queryData, setQueryData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({});

  async function fetchNotifications() {
    const response = await NotificationServices.index();
    const responseData = response.data;
    setNotifications(responseData);
  }

  async function fetchRow(act) {
    try {
      const response = await ContadorServices.index(filters);
      const responseData = response.data; // Supondo que a resposta tenha uma propriedade "data"

      if (responseData) {
        // Se os dados não estão vazios, atualize o estado
        setData(responseData);
        setQueryData(responseData);

        responseData.sort((a, b) => {
          // Se ambos tiverem disabled: true ou disabled: false, mantenha a ordem atual
          if (a.disabled === b.disabled) {
            return 0;
          }

          // Coloque os itens com disabled: true no final
          if (a.disabled) {
            return 1;
          } else {
            return -1;
          }
        });

        const updatedData = await responseData.map((item) => {
          let mate = item.material;
          let data = item.planing_date;
          let date_revision = item.date_revision;
          const count = item.count_number;
          const nextRev = item.next_revision;
          const rev = item.revision;
          const revTime = item.revision_time;
          var actualRev;
          var actualRevTime;

          for (var i = 0; i < 39; i++) {
            if (rev[i].checked == false) {
              actualRev = i;
              i = 40;
            }
          }

          for (var i = 0; i < 19; i++) {
            if (revTime[i].checked == false) {
              actualRevTime = i;
              i = 20;
            }
          }

          if (act >= 0 && act < 39) {
            if (rev[act].date === null) {
            }
          }

          if (
            (mate == true &&
              data !== null &&
              count <= nextRev &&
              count >= nextRev - 5000) ||
            (mate == true && data !== null && date_revision <= 30)
          ) {
            if (date_revision <= 30) {
              revTime[actualRevTime].ready_filter = false;
              revTime[actualRevTime].date_filter = false;
              revTime[actualRevTime].ready = true;
            } else {
              rev[actualRev].ready_filter = false;
              rev[actualRev].date_filter = false;
              rev[actualRev].ready = true;
            }
          } else {
            rev[actualRev].ready_filter = true;
            rev[actualRev].date_filter = true;
            rev[actualRev].ready = false;
          }

          return item;
        });

        updatedData.forEach((item) => {
          useItemUpdater(item._id, item);
        });
      } else {
        // Se os dados estão vazios, faça algo apropriado, por exemplo, exibir uma mensagem de erro
        console.log("Os dados estão vazios.");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os dados:", error);
    }
  }

  useEffect(() => {
    fetchRow(100);
    fetchNotifications(); // Chame a função de busca quando o componente for montado (ou quando necessário)
  }, []);

  return (
    <RowContext.Provider
      value={{
        data,
        queryData,
        fetchRow,
        fetchNotifications,
        notifications,
        filters,
        setFilters,
      }}
    >
      {children}
    </RowContext.Provider>
  );
};
