function padTo2Digits(num) {
  return String(num).padStart(2, "0");
}

export function getDateMonthYear(date) {
  if (!date) {
    return null;
  }
  return (
    padTo2Digits(date.getDate()) +
    "/" +
    padTo2Digits(date.getMonth()) +
    "/" +
    date.getFullYear()
  );
}

export function getHoursAndMinutes(date) {
  if (!date) {
    return null;
  }
  return padTo2Digits(date.getHours()) + ":" + padTo2Digits(date.getMinutes());
}
