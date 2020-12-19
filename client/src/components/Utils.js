import format from 'date-fns/format';

export const formatDate = date => format(date, 'dd/MM/yyyy');
export const formatDateFull = date => format(date, 'dd MMMM yyyy');
export const formatDateSkyscannerApi = date => format(date, 'yyyy-MM-dd');
export const formatMonth = date => format(date, 'MMMM yyyy');
export const formatDayAndTime = date => format(date, 'dd/MM HH:mm');

export const stringToDate = date => Date.parse(date);

export const formatDepartureArrivalFromString = (
  departureString,
  arrivalString,
) => {
  // TODO: we need error handling here
  const departureDate = stringToDate(departureString);
  const arrivalDate = stringToDate(arrivalString);

  return `${formatDayAndTime(departureDate)} --->
    ${formatDayAndTime(arrivalDate)}`;
};

export const convertTime = totMins => {
  const hours = Math.floor(totMins / 60);
  const minutes = totMins % 60;
  const minsFormatted = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}h ${minsFormatted}`;
};
