const isLeapYear = (year) => (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));

const getDaysInMonth = (year, month) => [
  31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];

const addMonths = (date, value) => {
  if (!date) return null;

  const newDate = new Date(date);
  const n = newDate.getDate();
  newDate.setDate(1);
  newDate.setMonth(newDate.getMonth() + value);
  newDate.setDate(Math.min(n, getDaysInMonth(newDate.getFullYear(), newDate.getMonth())));
  return newDate;
};

export default addMonths;
