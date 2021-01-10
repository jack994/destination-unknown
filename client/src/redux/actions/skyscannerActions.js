import { POPULATE_SKYSCANNER, TOGGLE_LOADING } from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const populateSkyscanner = apiResponse => ({
  type: POPULATE_SKYSCANNER,
  payload: { apiResponse },
});

export const toggleLoading = active => ({
  type: TOGGLE_LOADING,
  payload: { active },
});
