const dangerSelect = (value) => {
  if (value === true) {
    return "green";
  } else if (value === false) {
    return "red";
  }
};

export default function changeColorSelect(value) {
  const color = dangerSelect(value);
  return color;
}
