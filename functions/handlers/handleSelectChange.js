export default function handleSelectChange(
  event,
  itemId,
  setContador,
  ContadorServices
) {
  const { name, value } = event.target;

  setContador((prevContador) => {
    const updatedContador = prevContador.map((item) => {
      if (itemId === item._id) {
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
          item._id === itemId &&
          value === "sim" &&
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
            [name]: value === "sim" ? true : false,
            revision: {
              ...item.revision,
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
            [name]: value === "sim" ? true : false,
            revision: {
              ...item.revision,
              [activedRevision]: {
                ...item.revision[activedRevision],
                ready: false,
                date_filter: true,
                date: "",
              },
            },
          };
        }
      }
      return item;
    });

    const updatedContador2 = updatedContador.map((item) => {
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
        // DATE_FILTER = TRUE || READY_FILTER = TRUE || READY_FILTER = FALSE (R55 )
        //
        console.log("Checagem 2");
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

    updatedContador2.forEach((item) => {
      if (item._id === itemId) {
        ContadorServices.update(item._id, item)
          .then((response) => {
            console.log(
              `Item com ID ${item._id} atualizado com sucesso no banco de dados ${item.material}.`
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

    return updatedContador2;
  });
}
