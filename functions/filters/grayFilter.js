export default function filterGray(made, ready) {
  if (made === false || ready === false) {
    return false;
  } else if (made === true || ready === true) {
    return true;
  }
}
