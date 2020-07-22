export const getDate = (date) => {
  const dateObjToArr = date.toDateString().split(` `);
  const dateObj = {
    dayOfWeek: dateObjToArr[0],
    month: dateObjToArr[1],
    monthNumber: date.getMonth(),
    dayPresent: date.getDate(),
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };

  dateObj.timePresent = dateObj.hours + `:` + dateObj.minutes;
  return dateObj;
};
