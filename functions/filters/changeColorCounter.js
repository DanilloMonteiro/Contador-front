const danger = (c) => {
  let stop;
  if (c.revision.R0.checked === false) {
    stop = 0;
  } else if (c.revision.R30.checked === false) {
    stop = 30000;
  } else if (c.revision.R55.checked === false) {
    stop = 55000;
  } else if (c.revision.R80.checked === false) {
    stop = 80000;
  } else if (c.revision.R105.checked === false) {
    stop = 105000;
  }

  var date;
  if (c.revision.time1.checked === false) {
    date = c.revision.R0.date;
  } else if (c.revision.time2.checked === false) {
    date = c.revision.time1.date;
  } else if (c.revision.time3.checked === false) {
    date = c.revision.time2.date;
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

  const dateRevision = new Date(date);
  const nowDate = new Date();
  const variavel = nowDate - dateRevision;
  const varivalInDays = Math.floor(variavel / (1000 * 60 * 60 * 24));
  const faltam = 365 - varivalInDays;

  const nextRevision = stop - 5000;

  if (c.count_number >= stop || faltam <= 0) {
    return "red";
  } else if (c.count_number >= nextRevision || faltam < 30) {
    return "yellow";
  } else if (c.count_number < nextRevision) {
    return "green";
  }
};

export default function changeColorCounter(c) {
  const color = danger(c);
  return color;
}
