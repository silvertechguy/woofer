import {
  LOAD_SINGLE_WOOF,
  LOAD_SINGLE_WOOF_SUCCESS,
  LOAD_SINGLE_WOOF_FAIL,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
} from "../types";

import axios from "axios";

import API_BASE_URL from "../../api/baseUrl";

export const getWoof = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_SINGLE_WOOF });
    const { data } = await axios.get(`${API_BASE_URL}/woofs/${id}`);
    dispatch({ type: LOAD_SINGLE_WOOF_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: LOAD_SINGLE_WOOF_FAIL });
  }
};

export const addComment = (id, commentData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COMMENT });
    const { data } = await axios.post(
      `${API_BASE_URL}/woofs/${id}/comment`,
      commentData
    );
    dispatch({ type: ADD_COMMENT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADD_COMMENT_FAIL, payload: err.response.data });
  }
};
