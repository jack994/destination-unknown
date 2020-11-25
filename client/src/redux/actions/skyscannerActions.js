import { POPULATE_SKYSCANNER } from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const populateSkyscanner = apiResponse => ({
  type: POPULATE_SKYSCANNER,
  payload: { apiResponse },
});
