const danger = (
  value,
  R0_checked,
  R30_checked,
  R55_checked,
  R80_checked,
  R105_checked
) => {
  let stop;
  if (R0_checked === false) {
    stop = 0;
  } else if (R30_checked === false) {
    stop = 30000;
  } else if (R55_checked === false) {
    stop = 55000;
  } else if (R80_checked === false) {
    stop = 80000;
  } else if (R105_checked === false) {
    stop = 105000;
  }

  const nextRevision = stop - 5000;

  if (value >= stop) {
    return "red";
  } else if (value >= nextRevision) {
    return "yellow";
  } else if (value < nextRevision) {
    return "green";
  }
};

export default function changeColorCounter(
  value,
  R0_checked,
  R30_checked,
  R55_checked,
  R80_checked,
  R105_checked
) {
  const color = danger(
    value,
    R0_checked,
    R30_checked,
    R55_checked,
    R80_checked,
    R105_checked
  );
  return color;
}
