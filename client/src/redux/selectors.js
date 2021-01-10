// FlightContext selectors
export const getFromState = store => store.flightContext.origin;
export const getToState = store => store.flightContext.destination;
export const getStartDateState = store => store.flightContext.startDate;
export const getEndDateState = store => store.flightContext.endDate;
export const getNumberOfPeopleState = store =>
  store.flightContext.numberOfPassengers;
export const getNumberOfChildrenState = store =>
  store.flightContext.numberOfChildren;
export const getNumberOfInfantsState = store =>
  store.flightContext.numberOfInfants;
export const getIsReturnState = store => store.flightContext.isReturn;
export const getIsDirectOnlyState = store => store.flightContext.isDirectOnly;

// Skyscanner selectors
export const getMarkets = store =>
  store.skyscanner.tickets.map(ticket => ticket.market);
export const getTicketFromMarket = (store, market) =>
  store.skyscanner.tickets.find(ticket => ticket.market === market);
