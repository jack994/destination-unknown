import format from 'date-fns/format';

export const formatDate = date => format(date, 'dd/MM/yyyy');
export const formatDateFull = date => format(date, 'dd MMMM yyyy');
export const formatDateSkyscannerApi = date => format(date, 'yyyy-MM-dd');
export const formatMonth = date => format(date, 'MMMM yyyy');
export const formatDayAndTime = date => format(date, 'dd/MM HH:mm');

export const stringToDate = date => Date.parse(date);

const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

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

export const datesAreValid = (outbound, inbound) => {
  if (!outbound && !inbound) {
    return false;
  }
  const outboundTime = outbound.getTime();
  if (outbound && !inbound) {
    const currentDate = new Date();
    if (datesAreOnSameDay(outbound, currentDate)) {
      return true;
    }
    if (currentDate.getTime() > outboundTime) {
      return false;
    }
  } else if (outbound && inbound) {
    if (datesAreOnSameDay(outbound, inbound)) {
      return true;
    }
    const inboundTime = inbound.getTime();
    if (outboundTime > inboundTime) {
      return false;
    }
  }
  return true;
};
