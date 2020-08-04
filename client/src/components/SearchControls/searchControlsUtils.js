import format from 'date-fns/format';

export const formatDate = date => format(date, 'dd/MM/yyyy');
export const formatDateFull = date => format(date, 'dd MMMM yyyy');
export const formatDateSkyscannerApi = date => format(date, 'yyyy-MM-dd');
export const formatMonth = date => format(date, 'MMMM yyyy');

export const getIataFromPlaceString = str => {
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(str);
  return matches && matches[1] ? matches[1] : null;
};