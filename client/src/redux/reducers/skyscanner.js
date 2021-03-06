// TODO: this file needs testing and improvements
import { POPULATE_SKYSCANNER, TOGGLE_LOADING } from '../actions/actionTypes';

const initialState = {
  tickets: null,
  isLoading: false,
};

const getCheapestPricingOption = pricingOptions => {
  if (pricingOptions && pricingOptions.length > 0) {
    return pricingOptions.reduce((minObj, currentObj) =>
      currentObj.Price < minObj.Price ? currentObj : minObj,
    );
  }
  return null;
};

const getCheapestItinerary = itineraries => {
  if (itineraries && itineraries.length > 0) {
    return itineraries.reduce((minObj, currentObj) => {
      const cheapestPOMin = getCheapestPricingOption(minObj.PricingOptions);
      const cheapestPOCur = getCheapestPricingOption(currentObj.PricingOptions);
      if (cheapestPOMin && cheapestPOCur) {
        // TODO: here we can avoid reassigning cheapest for current every time somehow
        return cheapestPOCur.Price < cheapestPOMin.Price
          ? { ...currentObj, CheapestPricingOption: cheapestPOCur }
          : { ...minObj, CheapestPricingOption: cheapestPOMin };
      }
      // TODO: do we really need these two checks?
      if (cheapestPOMin) {
        return { ...minObj, CheapestPricingOption: cheapestPOMin };
      }
      if (cheapestPOCur) {
        return { ...currentObj, CheapestPricingOption: cheapestPOCur };
      }
      return null;
    });
  }
  return null;
};

const getAgentNamesFromItinerary = (itinerary, agents) => {
  const ids =
    itinerary.CheapestPricingOption && itinerary.CheapestPricingOption.Agents;
  if (!ids) {
    return [];
  }
  // TODO: this needs to become a reduce function
  return agents
    .filter(element => ids.indexOf(element.Id) !== -1)
    .map(element => element.Name);
};

const getLegDetailsFromId = (legId, legs) => {
  const leg = legs.find(element => element.Id === legId);
  return {
    departure: leg.Departure,
    arrival: leg.Arrival,
    duration: leg.Duration,
    stops: leg.Stops.length,
  };
};

const buildTicketFromElement = (element, cheapestItinerary) => ({
  market: element.market,
  agents: getAgentNamesFromItinerary(
    cheapestItinerary,
    element.response.Agents,
  ),
  price: cheapestItinerary.CheapestPricingOption
    ? cheapestItinerary.CheapestPricingOption.Price
    : getCheapestPricingOption(cheapestItinerary.PricingOptions).Price,
  url: cheapestItinerary.CheapestPricingOption
    ? cheapestItinerary.CheapestPricingOption.DeeplinkUrl
    : getCheapestPricingOption(cheapestItinerary.PricingOptions).DeeplinkUrl,
  outbound: getLegDetailsFromId(
    cheapestItinerary.OutboundLegId,
    element.response.Legs,
  ),
  inbound: cheapestItinerary.InboundLegId
    ? getLegDetailsFromId(cheapestItinerary.InboundLegId, element.response.Legs)
    : null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_SKYSCANNER: {
      const { apiResponse } = action.payload;
      const tickets = [];

      apiResponse.forEach(element => {
        if (
          element.market &&
          element.response &&
          element.response.Itineraries
        ) {
          const itinerary = getCheapestItinerary(element.response.Itineraries);
          if (itinerary) {
            // TODO: try not to push but use functional (e.g. reduce or something else)
            const ticket = buildTicketFromElement(element, itinerary);
            tickets.push(ticket);
          }
        }
      });

      return {
        ...state,
        // TODO: can we avoid updating the whole ticket but only the part that changed?
        tickets,
      };
    }
    case TOGGLE_LOADING: {
      const { active } = action.payload;
      return {
        ...state,
        isLoading: active,
      };
    }
    default:
      return state;
  }
};
