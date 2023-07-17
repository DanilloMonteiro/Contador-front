export default function oneYearFunction(c, setContador, ContadorServices) {
  var date;
  var date1;
  var date2;
  var date3;
  if (c.revision.time1.checked === false) {
    if (c.revision.R30.checked == false) {
      date1 = c.revision.R0.date;
    } else if (c.revision.R55.checked == false) {
      date1 = c.revision.R30.date;
    } else if (c.revision.R80.checked == false) {
      date1 = c.revision.R55.date;
    } else if (c.revision.R105.checked == false) {
      date1 = c.revision.R80.date;
    }

    date = date1;
  } else if (c.revision.time2.checked === false) {
    if (c.revision.R30.checked == false) {
      date1 = c.revision.R0.date;
    } else if (c.revision.R55.checked == false) {
      date1 = c.revision.R30.date;
    } else if (c.revision.R80.checked == false) {
      date1 = c.revision.R55.date;
    } else if (c.revision.R105.checked == false) {
      date1 = c.revision.R80.date;
    }
    date = new Date(c.revision.time1.date) - new Date();
    date2 = new Date(date1) - new Date();
    if (date < date2) {
      date3 = date1;
    } else {
      date3 = c.revision.time1.date;
    }
  } else if (c.revision.time3.checked === false) {
    if (c.revision.R30.checked == false) {
      date1 = c.revision.R0.date;
    } else if (c.revision.R55.checked == false) {
      date1 = c.revision.R30.date;
    } else if (c.revision.R80.checked == false) {
      date1 = c.revision.R55.date;
    } else if (c.revision.R105.checked == false) {
      date1 = c.revision.R80.date;
    }
    date = new Date(c.revision.time2.date) - new Date();
    date2 = new Date(date1) - new Date();
    if (date < date2) {
      date3 = date1;
    } else {
      date3 = c.revision.time1.date;
    }
  } else if (c.revision.R0.checked === false) {
    console.log("Mesa não instalada ainda!");
    // Saia da função se a mesa não estiver instalada
  } else if (c.revision.R30.checked == false) {
    date = c.revision.R0.date;
  } else if (c.revision.R55.checked == false) {
    date = c.revision.R30.date;
  } else if (c.revision.R80.checked == false) {
    date = c.revision.R55.date;
  } else if (c.revision.R105.checked == false) {
    date = c.revision.R80.date;
  }

  console.log(date3, "date3");
  const dateRevision = new Date(date3);
  const nowDate = new Date();
  const variavel = nowDate - dateRevision;
  const varivalInDays = Math.floor(variavel / (1000 * 60 * 60 * 24));
  const faltam = 365 - varivalInDays;

  setContador((prevContador) => {
    const updatedContador = prevContador.map((item) => {
      if (item._id === c._id) {
        return {
          ...item,
          date_revision: faltam,
        };
      }
      return item;
    });

    updatedContador.forEach((item) => {
      if (item._id === c._id) {
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

  return faltam;
}
