import { createContext, useState, useEffect } from "react";
import ContadorServices from "@/services/contador";
import handleInputChange from "@/functions/handlers/handleInputChange";
import searchFilter from "@/functions/filters/searchFilter";
import handleFilterChange from "@/functions/handlers/handleFilterChange";
import handleSelectChange from "@/functions/handlers/handleSelectChange";
import changeColorCounter from "@/functions/filters/changeColorCounter";
import changeColorSelect from "@/functions/filters/changeColorSelect";
import { handleDateChange } from "@/functions/handlers/dataChange/handleDateChange";
import handleInputChangeRevision from "@/functions/handlers/handleInputChangeRevision";
import handleDateChangeRevision from "@/functions/handlers/dataChange/revision/handleDateChangeRevision";
import handleChangeFilter from "@/functions/handlers/handleChangeFilter";

export const RowContext = createContext();

export const RowProvider = ({ children }) => {
  const [contador, setContador] = useState([]);

  const [camposAmarelos, setCamposAmarelos] = useState([]);
  const [camposVermelhos, setCamposVermelhos] = useState([]);
  const [maior, setMaior] = useState([]);
  const [menor, setMenor] = useState([]);
  const [padrao, setPadrao] = useState([]);
  const [stop, setStop] = useState();

  const [isFilterActive1, setFilterActive1] = useState(true);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [planingdate, setPlaningdate] = useState();

  async function fetchContador() {
    const response = await ContadorServices.index();
    if (response.data.length >= 1) {
      const camposFiltradosAmarelos = response.data.filter(
        (c) => changeColorCounterWrapper(c.count_number) === "yellow"
      );
      const camposFiltradosVermelhos = response.data.filter(
        (c) => changeColorCounterWrapper(c.count_number) === "red"
      );

      const sortedDataMaior = [...response.data].sort(
        (a, b) => b.count_number - a.count_number
      );

      const sortedDataMenor = [...response.data].sort(
        (a, b) => a.count_number - b.count_number
      );

      const valuePlaningdate = response.data.map((c) => {
        return c.planing_date;
      });

      const checkFields = () => {
        const updatedData = response.data.map((item) => {
          let activedRevision;
          let nextRevision;
          let stop;
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
            item.material === true &&
            item.count_number >= stop &&
            datetimeRegex.test(formattedDate)
          ) {
            //
            // Devolve DATA_FILTER = FALSE || READY = TRUE
            // DESATIVA O FILTRO DA DATA
            //
            console.log("Checagem 1");
            return {
              ...item,
              revision: {
                ...item.revision,
                R0: {
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
          } else {
            //
            // Devolve DATA_FILTER = TRUE || READY = FALSE
            // ATIVA O FILTRO DA DATA E ZERA A DATA
            //
            console.log("Checagem 1 false");
            return {
              ...item,
              revision: {
                ...item.revision,
                R0: {
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
            console.log("Checagem 2 ");

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
            item.material === true &&
            item.count_number >= stop &&
            datetimeRegex.test(formattedValueDate)
          ) {
            //
            // Confere novamente: MATERIAL, CONTAGEM E DATA PLANEJADA
            // DATE_FILTER = TRUE || READY_FILTER = FALSE || READY_FILTER = TRUE (R55 )
            //
            console.log("Checagem 2 false");

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
              },
            };
          } else {
            //
            // CASO NAO CAIA EM NENHUM IF VEM AQUI (PODE ESTAR ERRADO)
            //
            console.log("Checagem 2 false 2");

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
              },
            };
          }
        });

        //
        // FAZ O UPDATE NO BANCO DE DADOS
        //
        updatedData2.forEach((item) => {
          ContadorServices.update(item._id, item)
            .then((response) => {
              console.log(
                `Item com ID ${item._id} atualizado com sucesso no banco de dados .`
              );
            })
            .catch((error) => {
              console.error(
                `Erro ao atualizar o item com ID ${item._id} no banco de dados:`,
                error
              );
            });
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
    handleSelectChange(event, itemId, setContador, ContadorServices);
  };

  const handleDateChangeRevisionWrapper = (event, itemId) => {
    handleDateChangeRevision(event, itemId, setContador, ContadorServices);
  };

  const handleInputChangeRevisionWrapper = (event, itemId) => {
    handleInputChangeRevision(event, itemId, setContador, ContadorServices);
  };

  const handleInputChangeWrapper = (event, itemId) => {
    handleInputChange(event, itemId, setContador, ContadorServices);
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
    return handleDateChange(
      event,
      itemId,
      setContador,
      ContadorServices,
      setShowConfirmation
    );
  };

  const handleChangeFilterWrapper = (event, checked, itemId, contador) => {
    handleChangeFilter(event, checked, itemId, contador, setContador);
  };

  const searchFilterWrapper = (pesquisa) => {
    searchFilter(pesquisa, padrao, setContador);
  };

  const changeColorSelectWrapper = (value) => {
    return changeColorSelect(value);
  };

  const changeColorCounterWrapper = (
    value,
    R0_checked,
    R30_checked,
    R55_checked,
    R80_checked,
    R105_checked
  ) => {
    return changeColorCounter(
      value,
      R0_checked,
      R30_checked,
      R55_checked,
      R80_checked,
      R105_checked
    );
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
        isFilterActive1,
        setFilterActive1,
        checkR0,
        planingdate,
        contador,
        fetchContador,
        showConfirmation,
        changeColorCounterWrapper,
        changeColorSelectWrapper,
        searchFilterWrapper,
        handleDateChangeRevisionWrapper,
        handleFilterChangeWrapper,
        handleInputChangeWrapper,
        handleSelectChangeWrapper,
        handleChangeFilterWrapper,
        handleDateChangeWrapper,
        handleInputChangeRevisionWrapper,
      }}
    >
      {children}
    </RowContext.Provider>
  );
};
