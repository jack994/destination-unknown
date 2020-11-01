import {
  CHANGE_FROM,
  CHANGE_TO,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  CHANGE_PASSENGERS,
  CHANGE_CHILDREN,
  CHANGE_INFANTS,
  CHANGE_TRIP_TYPE,
} from '../actions/actionTypes';

const initialState = {
  origin: null,
  destination: null,
  startDate: null,
  endDate: null,
  numberOfPassengers: 0,
  numberOfChildren: 0,
  numberOfInfants: 0,
  isReturn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FROM: {
      const { place } = action.payload;
      return {
        ...state,
        origin: place,
      };
    }
    case CHANGE_TO: {
      const { place } = action.payload;
      return {
        ...state,
        destination: place,
      };
    }
    case CHANGE_START_DATE: {
      const { date } = action.payload;
      return {
        ...state,
        startDate: date,
      };
    }
    case CHANGE_END_DATE: {
      const { date } = action.payload;
      return {
        ...state,
        endDate: date,
      };
    }
    case CHANGE_PASSENGERS: {
      const { passengers } = action.payload;
      return {
        ...state,
        numberOfPassengers: passengers,
      };
    }
    case CHANGE_CHILDREN: {
      const { children } = action.payload;
      return {
        ...state,
        numberOfChildren: children,
      };
    }
    case CHANGE_INFANTS: {
      const { infants } = action.payload;
      return {
        ...state,
        numberOfInfants: infants,
      };
    }
    case CHANGE_TRIP_TYPE: {
      return { ...state, isReturn: !state.isReturn };
    }
    default:
      return state;
  }
};
