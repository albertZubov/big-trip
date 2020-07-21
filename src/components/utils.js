export const getDate = (dateMilliseconds) => {
  const date = new Date(dateMilliseconds);
  const dateObjToArr = date.toDateString().split(` `);
  const dateObj = {
    dayOfWeek: dateObjToArr[0],
    month: dateObjToArr[1],
    monthNumber: date.getMonth(),
    dayPresent: date.getDate(),
    year: date.getFullYear(),
    timePresent: date.toTimeString().slice(0, 5),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
  return dateObj;
};
