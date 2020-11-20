import {
  CHANGE_FROM,
  CHANGE_TO,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  CHANGE_PASSENGERS,
  CHANGE_CHILDREN,
  CHANGE_INFANTS,
  CHANGE_TRIP_TYPE,
  POPULATE_SKYSCANNER,
} from './actionTypes';

export const changeFrom = place => ({
  type: CHANGE_FROM,
  payload: { place },
});

export const changeTo = place => ({
  type: CHANGE_TO,
  payload: { place },
});

export const changeStartDate = date => ({
  type: CHANGE_START_DATE,
  payload: { date },
});

export const changeEndDate = date => ({
  type: CHANGE_END_DATE,
  payload: { date },
});

export const changePassengers = passengers => ({
  type: CHANGE_PASSENGERS,
  payload: { passengers },
});

export const changeChildren = children => ({
  type: CHANGE_CHILDREN,
  payload: { children },
});

export const changeInfants = infants => ({
  type: CHANGE_INFANTS,
  payload: { infants },
});

export const changeTripType = () => ({
  type: CHANGE_TRIP_TYPE,
});

export const populateSkyscanner = apiResponse => ({
  type: POPULATE_SKYSCANNER,
  payload: { apiResponse },
});
