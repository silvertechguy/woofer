import {
  USER_DETAILS,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_USER_DETAILS,
} from "../types";

import axios from "axios";

import API_BASE_URL from "../../api/baseUrl";

export const getUserDetails = (username) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS });
    const { data } = await axios.get(`${API_BASE_URL}/users/${username}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: USER_DETAILS_FAIL });
  }
};
export const clearUserDetails = () => (dispatch) => {
  dispatch({ type: CLEAR_USER_DETAILS });
};
