import { createContext, useState, useEffect } from "react";
import { handleDateChange } from "@/functions/handlers/dataChange/handleDateChange";
import ContadorServices from "@/services/contador";
import handleInputChange from "@/functions/handlers/handleInputChange";
import searchFilter from "@/functions/filters/searchFilter";
import handleFilterChange from "@/functions/handlers/handleFilterChange";
import handleSelectChange from "@/functions/handlers/handleSelectChange";
import changeColorCounter from "@/functions/filters/changeColorCounter";
import changeColorSelect from "@/functions/filters/changeColorSelect";
import handleInputChangeRevision from "@/functions/handlers/handleInputChangeRevision";
import handleDateChangeRevision from "@/functions/handlers/dataChange/revision/handleDateChangeRevision";
import handleChangeFilter from "@/functions/handlers/handleChangeFilter";
import handleSimpleSelectChange from "@/functions/handlers/handleSimplesSelectChange";
import handleCheckboxChange from "@/functions/handlers/handleCheckboxChange";
import handleCheckboxChange2 from "@/functions/handlers/handleCheckboxChange";
import oneYearFunction from "@/functions/filters/oneYearFunction";
import handleDateChangeRevision2 from "@/functions/handlers/dataChange/revision/handleDateChangeRevision2";
import useItemUpdater from "@/hooks/useItemUpdater";
import NotificationServices from "@/services/notification";

export const RowContext = createContext();

export const RowProvider = ({ children }) => {
  const [contador, setContador] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [camposAmarelos, setCamposAmarelos] = useState([]);
  const [camposVermelhos, setCamposVermelhos] = useState([]);
  const [maior, setMaior] = useState([]);
  const [menor, setMenor] = useState([]);
  const [padrao, setPadrao] = useState([]);
  const [desabilitadas, setDesabilitadas] = useState([]);
  const [habilitados2, setHabilitados] = useState([]);

  const [isFilterActive1, setFilterActive1] = useState(true);

  const [planingdate, setPlaningdate] = useState();

  async function fetchContador() {
    const response = await ContadorServices.index();
    const response2 = await NotificationServices.index();
    setNotifications(response2.data);

    const desabilitados = response.data.filter((c) => c.desabled === true);
    const habilitados = response.data.filter((c) => c.desabled === false);

    setHabilitados(habilitados);
    setDesabilitadas(desabilitados);

    if (habilitados.length >= 1) {
      const camposFiltradosAmarelos = habilitados.filter(
        (c) => changeColorCounterWrapper(c) === "yellow"
      );
      const camposFiltradosVermelhos = habilitados.filter(
        (c) => changeColorCounterWrapper(c) === "red"
      );

      const sortedDataMaior = [...habilitados].sort(
        (a, b) => b.count_number - a.count_number
      );

      const sortedDataMenor = [...habilitados].sort(
        (a, b) => a.count_number - b.count_number
      );

      const valuePlaningdate = habilitados.map((c) => {
        return c.planing_date;
      });

      const checkFields = () => {
        const updatedData = habilitados.map((item) => {
          oneYearFunctionWrapper(item);
          let activedRevision;
          let stop;
          let stop_table;
          let days30 = 30;
          if (item.revision.R0.checked === false) {
            activedRevision = "R0";
            stop_table = 0;
            stop = 0;
          } else if (item.revision.R30.checked === false) {
            activedRevision = "R30";

            stop_table = 30000;
            stop = 25000;
          } else if (item.revision.R55.checked === false) {
            activedRevision = "R55";
            stop_table = 55000;
            stop = 50000;
          } else if (item.revision.R80.checked === false) {
            activedRevision = "R80";
            stop_table = 80000;
            stop = 75000;
          } else if (item.revision.R105.checked === false) {
            stop_table = 105000;
            activedRevision = "R105";
          } else {
            null;
          }
          let timeRevisionActual;
          if (item.revision.time1.checked === false) {
            timeRevisionActual = "time1";
          } else if (item.revision.time2.checked === false) {
            timeRevisionActual = "time2";
          } else if (item.revision.time3.checked === false) {
            timeRevisionActual = "time3";
          }

          if (item.revision.checked === true) {
            return {
              ...item,
              [splited[0]]: {
                ...item.revision,
                [splited[1]]: {
                  ...item.revision[splited[1]],
                  [splited[2]]: value
                    ? new Date(value).toISOString().split("T")[0]
                    : null,
                  date_filter: true,
                },
              },
            };
          }

          let formattedDate = null;

          if (item.planing_date) {
            const date = new Date(item.planing_date);
            formattedDate = date.toISOString().split("T")[0];
          }

          const datetimeRegex = /^\d{4}-\d{2}-\d{2}$/;
          //
          // Comfere se tem = MATEIRAL, CONTAGEM, DATA DE PLANEJAMENTO
          //

          if (
            (item.material === true &&
              item.count_number >= stop &&
              datetimeRegex.test(formattedDate)) ||
            (item.material === true &&
              item.date_revision <= days30 &&
              item.count_number >= stop - 5000 &&
              datetimeRegex.test(formattedDate))
          ) {
            //
            // Devolve DATA_FILTER = FALSE || READY = TRUE
            // DESATIVA O FILTRO DA DATA
            //

            return {
              ...item,
              stop_table: stop_table,
              revision: {
                ...item.revision,
                R0: {
                  ...item.revision.R0,
                  ready: true,
                  ready_filter: true,
                  date_filter: true,
                },
                [activedRevision]: {
                  ...item.revision[activedRevision],
                  ready: true,
                  date_filter: false,
                },
              },
            };
          } else if (
            (item.material === true &&
              item.count_number >= stop &&
              datetimeRegex.test(formattedDate)) ||
            (item.material === true &&
              item.date_revision <= days30 &&
              item.count_number <= stop - 5000 &&
              datetimeRegex.test(formattedDate))
          ) {
            return {
              ...item,
              stop_table: stop_table,
              revision: {
                ...item.revision,
                R0: {
                  ...item.revision.R0,
                  ready: true,
                  ready_filter: true,
                  date_filter: true,
                },
                [activedRevision]: {
                  ...item.revision[activedRevision],
                  ready: false,
                  ready_filter: true,
                  date_filter: true,
                },
                [timeRevisionActual]: {
                  ...item.revision[timeRevisionActual],
                  ready: true,
                  ready_filter: false,
                  date_filter: false,
                },
              },
            };
          } else {
            //
            // Devolve DATA_FILTER = TRUE || READY = FALSE
            // ATIVA O FILTRO DA DATA E ZERA A DATA
            //

            return {
              ...item,
              stop_table: stop_table,
              revision: {
                ...item.revision,
                R0: {
                  ...item.revision.R0,
                  ready: true,
                  ready_filter: true,
                  date_filter: true,
                },
                [activedRevision]: {
                  ...item.revision[activedRevision],
                  ready: false,
                  date_filter: true,
                  date: "",
                },
              },
            };
          }
        });

        const updatedData2 = updatedData.map((item) => {
          let activedRevision;
          let nextRevision;
          let stop;
          let days30 = 30;
          if (item.revision.R0.checked === false) {
            activedRevision = "R0";
            nextRevision = "R30";
            stop = 0;
          } else if (item.revision.R30.checked === false) {
            activedRevision = "R30";
            nextRevision = "R55";
            stop = 25000;
          } else if (item.revision.R55.checked === false) {
            activedRevision = "R55";
            nextRevision = "R80";
            stop = 50000;
          } else if (item.revision.R80.checked === false) {
            activedRevision = "R80";
            nextRevision = "R105";
            stop = 75000;
          } else if (item.revision.R105.checked === false) {
            activedRevision = "R105";
          } else {
            null;
          }
          let timeRevisionActual;
          if (item.revision.time1.checked === false) {
            timeRevisionActual = "time1";
          } else if (item.revision.time2.checked === false) {
            timeRevisionActual = "time2";
          } else if (item.revision.time3.checked === false) {
            timeRevisionActual = "time3";
          }

          let formattedRevisionDate = null;
          if (item.revision[activedRevision].date) {
            const date = new Date(item.revision[activedRevision].date);
            formattedRevisionDate = date.toISOString().split("T")[0];
          }

          let formattedValueDate = null;
          if (item.planing_date) {
            const date = new Date(item.planing_date);
            formattedValueDate = date.toISOString().split("T")[0];
          }

          const datetimeRegex = /^\d{4}-\d{2}-\d{2}$/;
          //
          // Comfere se tem = PLANEJADO A MANUTENCAO ""P""
          // E SE TEM A DATA QUE FOI FEITA ""R""
          //
          if (
            item.revision[activedRevision].ready === true &&
            datetimeRegex.test(formattedRevisionDate)
          ) {
            //
            // Devolve CASO TENHA OS DADOS ELE TRAVA OS CAMPOS JA PREENCHIDO E
            // LIBERA O PROXIMO CAMPO NO CASO O 30000
            // DATE_FILTER = TRUE || READY_FILTER = TRUE || READY_FILTER = FALSE (R30 )
            //
            return {
              ...item,
              revision: {
                ...item.revision,
                [activedRevision]: {
                  ...item.revision[activedRevision],
                  date_filter: true,
                  ready_filter: true,
                },
                [nextRevision]: {
                  ...item.revision[nextRevision],
                  ready_filter: false,
                },
              },
            };
          } else if (
            (item.material === true &&
              item.count_number >= stop &&
              datetimeRegex.test(formattedValueDate)) ||
            (item.material === true &&
              item.date_revision <= days30 &&
              item.count_number >= stop - 5000 &&
              datetimeRegex.test(formattedValueDate))
          ) {
            //
            // Confere novamente: MATERIAL, CONTAGEM E DATA PLANEJADA
            // DATE_FILTER = TRUE || READY_FILTER = FALSE || READY_FILTER = TRUE (R55 )
            //
            return {
              ...item,
              revision: {
                ...item.revision,
                [activedRevision]: {
                  ...item.revision[activedRevision],
                  date_filter: false,
                  ready_filter: false,
                },
                [nextRevision]: {
                  ...item.revision[nextRevision],
                  ready_filter: true,
                },
                [timeRevisionActual]: {
                  ...item.revision[timeRevisionActual],
                  ready: false,
                  ready_filter: true,
                  date_filter: true,
                },
              },
            };
          } else if (
            (item.material === true &&
              item.count_number >= stop &&
              datetimeRegex.test(formattedValueDate)) ||
            (item.material === true &&
              item.date_revision <= days30 &&
              item.count_number <= stop - 5000 &&
              datetimeRegex.test(formattedValueDate))
          ) {
            return {
              ...item,
              revision: {
                ...item.revision,
                R0: {
                  ...item.revision.R0,
                  ready: true,
                  ready_filter: true,
                  date_filter: true,
                },
                [activedRevision]: {
                  ...item.revision[activedRevision],
                  ready: false,
                  ready_filter: true,
                  date_filter: true,
                },
                [timeRevisionActual]: {
                  ...item.revision[timeRevisionActual],
                  ready: true,
                  ready_filter: false,
                  date_filter: false,
                },
              },
            };
          } else {
            //
            // CASO NAO CAIA EM NENHUM IF VEM AQUI (PODE ESTAR ERRADO)
            //

            return {
              ...item,
              revision: {
                ...item.revision,
                [activedRevision]: {
                  ...item.revision[activedRevision],
                  date_filter: true,
                  ready_filter: false,
                },
                [nextRevision]: {
                  ...item.revision[nextRevision],
                  ready_filter: true,
                },
                [timeRevisionActual]: {
                  ...item.revision[timeRevisionActual],
                  ready: false,
                  ready_filter: true,
                  date_filter: true,
                },
              },
            };
          }
        });

        //
        // FAZ O UPDATE NO BANCO DE DADOS
        //
        updatedData2.forEach((item) => {
          useItemUpdater(item._id, item);
        });

        return updatedData2;
      };

      setFilterActive1(true);
      setPlaningdate(valuePlaningdate);
      setMaior(sortedDataMaior);
      setMenor(sortedDataMenor);
      setCamposVermelhos(camposFiltradosVermelhos);
      setCamposAmarelos(camposFiltradosAmarelos);
      setContador(checkFields());
      setPadrao(checkFields());
    }
  }

  const handleSelectChangeWrapper = (event, itemId) => {
    handleSelectChange(event, itemId, setContador);
  };

  const handleDateChangeRevisionWrapper = (event, itemId) => {
    handleDateChangeRevision(event, itemId, setContador);
  };

  const handleDateChangeRevisionWrapper2 = (event, itemId) => {
    handleDateChangeRevision2(event, itemId, setContador);
  };

  const handleInputChangeRevisionWrapper = (event, itemId) => {
    handleInputChangeRevision(event, itemId, setContador);
  };

  const handleSimpleSelectChangeWrapper = (event, itemId) => {
    handleSimpleSelectChange(event, itemId, setContador);
  };

  const handleInputChangeWrapper = (event, itemId) => {
    handleInputChange(event, itemId, setContador);
  };

  const handleFilterChangeWrapper = (event) => {
    handleFilterChange(
      event,
      setContador,
      padrao,
      camposAmarelos,
      camposVermelhos,
      maior,
      menor
    );
  };

  const handleDateChangeWrapper = (event, itemId) => {
    return handleDateChange(event, itemId, setContador);
  };

  const handleCheckboxChangeWrapper = (event, itemId) => {
    return handleCheckboxChange(
      event,
      itemId,
      setDesabilitadas,
      ContadorServices
    );
  };

  const handleCheckboxChangeWrapper2 = (event, itemId) => {
    return handleCheckboxChange2(event, itemId, setContador);
  };

  const handleChangeFilterWrapper = (event, checked, itemId) => {
    handleChangeFilter(event, checked, itemId, ContadorServices, setContador);
  };

  const searchFilterWrapper = (pesquisa) => {
    searchFilter(pesquisa, padrao, setContador);
  };

  const oneYearFunctionWrapper = (c) => {
    return oneYearFunction(c, setContador);
  };

  const changeColorSelectWrapper = (value) => {
    return changeColorSelect(value);
  };

  const changeColorCounterWrapper = (c) => {
    return changeColorCounter(c);
  };

  const checkR0 = (ready, date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(date) && ready == true) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchContador();
  }, []);

  return (
    <RowContext.Provider
      value={{
        notifications,
        isFilterActive1,
        setFilterActive1,
        camposAmarelos,
        camposVermelhos,
        checkR0,
        planingdate,
        desabilitadas,
        contador,
        fetchContador,
        habilitados2,
        oneYearFunctionWrapper,
        changeColorCounterWrapper,
        changeColorSelectWrapper,
        searchFilterWrapper,
        handleFilterChangeWrapper,
        handleSimpleSelectChangeWrapper,
        handleSelectChangeWrapper,
        handleChangeFilterWrapper,
        handleCheckboxChangeWrapper,
        handleCheckboxChangeWrapper2,
        handleInputChangeWrapper,
        handleInputChangeRevisionWrapper,
        handleDateChangeWrapper,
        handleDateChangeRevisionWrapper,
        handleDateChangeRevisionWrapper2,
      }}
    >
      {children}
    </RowContext.Provider>
  );
};
