import { CLEAR_UI_ERRORS } from "../types";

export const clearUIErrors = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_UI_ERRORS });
  } catch (err) {}
};
