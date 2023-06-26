import { createContext, useState, useEffect } from "react";
import ContadorServices from "@/services/contador";
import handleInputChange from "@/functions/handlers/handleInputChange";
import searchFilter from "@/functions/filters/searchFilter";
import handleFilterChange from "@/functions/handlers/handleFilterChange";
import filterGray from "@/functions/filters/grayFilter";

export const RowContext = createContext();

export const RowProvider = ({ children }) => {
  const [contador, setContador] = useState([]);
  const [camposAmarelos, setCamposAmarelos] = useState([]);
  const [camposVermelhos, setCamposVermelhos] = useState([]);
  const [maior, setMaior] = useState([]);
  const [menor, setMenor] = useState([]);
  const [padrao, setPadrao] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [itemId, setItemId] = useState("");

  async function fetchContador() {
    const response = await ContadorServices.index();
    if (response.data.length >= 1) {
      const camposFiltradosAmarelos = response.data.filter(
        (c) => change(c.count_number) === "yellow"
      );
      const camposFiltradosVermelhos = response.data.filter(
        (c) => change(c.count_number) === "red"
      );

      const sortedDataMaior = [...response.data].sort(
        (a, b) => b.count_number - a.count_number
      );

      const sortedDataMenor = [...response.data].sort(
        (a, b) => a.count_number - b.count_number
      );

      setMaior(sortedDataMaior);
      setMenor(sortedDataMenor);
      setCamposVermelhos(camposFiltradosVermelhos);
      setCamposAmarelos(camposFiltradosAmarelos);
      setContador(response.data);
      setPadrao(response.data);
    }
  }

  function revisionReady() {
    const uploadedContador = contador.map((c) => {
      if (c.planing_date && c.count_number > 25000 && c.material === true) {
        c.revision.R0.ready = true;
      } else {
        c.revision.R0.ready = false;
      }
    });

    setContador(uploadedContador);
  }

  const handleSelectCampChange = (event, itemId) => {
    const { name, value } = event.target;

    setContador((prevContador) => {
      const updatedContador = prevContador.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            [name]: value === "sim" ? true : false,
          };
        }
        return item;
      });

      updatedContador.forEach((item) => {
        if (item._id === itemId) {
          ContadorServices.update(item._id, item)
            .then((response) => {
              console.log(
                `Item com ID ${item._id} atualizado com sucesso no banco de dados.`
              );
            })
            .catch((error) => {
              console.error(
                `Erro ao atualizar o item com ID ${item._id} no banco de dados:`,
                error
              );
            });
        }
      });

      revisionReady();

      return updatedContador;
    });
  };

  const handleDateChange = (event, itemId) => {
    const { name, value } = event.target;
    setItemId(itemId);
    setSelectedDate(value);
    setSelectedName(name);
    setShowConfirmation(true);
  };

  const cancelDateChange = () => {
    setSelectedDate("");
    setSelectedName("");
    setShowConfirmation(false);
  };

  const confirmDateChange = () => {
    setContador((prevContador) => {
      const splited = selectedName.split(".");

      const updatedContador = prevContador.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            [splited[0]]: {
              ...item.revision,
              [splited[1]]: {
                ...item.revision.R0,
                [splited[2]]: selectedDate
                  ? new Date(selectedDate).toISOString().split("T")[0]
                  : null,
              },
            },
          };
        }

        return item;
      });

      updatedContador.forEach((item) => {
        if (item._id === itemId) {
          ContadorServices.update(item._id, item)
            .then((response) => {
              console.log(
                `Item com ID ${item._id} atualizado com sucesso no banco de dados com a data  ${item.revision.R0.date} date.`
              );
            })
            .catch((error) => {
              console.error(
                `Erro ao atualizar o item com ID ${item._id} no banco de dados:`,
                error
              );
            });
        }
      });

      revisionReady();

      return updatedContador;
    });

    setShowConfirmation(false);
  };

  const handleInputChangeRevision = (event, itemId) => {
    const { name, value } = event.target;

    const fieldParts = name.split(".");

    setContador((prevContador) => {
      const updatedContador = prevContador.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            [fieldParts[0]]: {
              [fieldParts[1]]: {
                [fieldParts[2]]: value,
              },
            },
          };
        }
        return item;
      });

      updatedContador.forEach((item) => {
        if (item._id === itemId) {
          ContadorServices.update(item._id, item)
            .then((response) => {
              console.log(
                `Item com ID ${item._id} atualizado com sucesso no banco de dados.`
              );
            })
            .catch((error) => {
              console.error(
                `Erro ao atualizar o item com ID ${item._id} no banco de dados:`,
                error
              );
            });
        }
      });

      return updatedContador;
    });
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

  const searchFilterWrapper = (pesquisa) => {
    searchFilter(pesquisa, padrao, setContador);
  };

  const grayFilterWrapper = (made, ready) => {
    filterGray(made, ready);
  };

  const stop = 30000;

  const nextPrev = stop - 5000;

  const danger = (value) => {
    if (value >= stop) {
      return "red";
    } else if (value >= nextPrev) {
      return "yellow";
    } else if (value < nextPrev) {
      return "green";
    }
  };

  const dangerSelect = (value) => {
    if (value === true) {
      return "green";
    } else if (value === false) {
      return "red";
    }
  };

  const changeSelect = (value) => {
    const color = dangerSelect(value);

    return color;
  };

  const change = (value) => {
    const color = danger(value);

    return color;
  };

  useEffect(() => {
    fetchContador();
  }, []);

  return (
    <RowContext.Provider
      value={{
        showConfirmation,
        confirmDateChange,
        grayFilterWrapper,
        cancelDateChange,
        contador,
        change,
        changeSelect,
        searchFilterWrapper,
        fetchContador,
        handleDateChange,
        handleFilterChangeWrapper,
        handleInputChangeWrapper,
        handleSelectCampChange,
        handleInputChangeRevision,
      }}
    >
      {children}
    </RowContext.Provider>
  );
};
