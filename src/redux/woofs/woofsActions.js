import {
  LOAD_WOOFS,
  LOAD_WOOFS_SUCCESS,
  LOAD_WOOFS_FAIL,
  DELETE_WOOF,
  DELETE_WOOF_SUCCESS,
  DELETE_WOOF_FAIL,
  LIKE_WOOF,
  LIKE_WOOF_SUCCESS,
  LIKE_WOOF_FAIL,
  UN_LIKE_WOOF,
  UN_LIKE_WOOF_SUCCESS,
  UN_LIKE_WOOF_FAIL,
  ADD_WOOF_SUCCESS,
  ADD_WOOF,
  ADD_WOOF_FAIL,
} from "../types";

import axios from "axios";

import API_BASE_URL from "../../api/baseUrl";
import { loadAuthUser } from "../auth/authActions";

export const getWoofs = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_WOOFS });
    const { data } = await axios.get(`${API_BASE_URL}/woofs`);
    dispatch({ type: LOAD_WOOFS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: LOAD_WOOFS_FAIL });
  }
};

export const deleteWoof = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WOOF });
    await axios.delete(`${API_BASE_URL}/woofs/${id}`);
    dispatch({ type: DELETE_WOOF_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_WOOF_FAIL });
  }
};

export const likeWoof = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_WOOF });
    const { data } = await axios.get(`${API_BASE_URL}/woofs/${id}/like`);
    dispatch({ type: LIKE_WOOF_SUCCESS, payload: { ...data, id } });
    dispatch(loadAuthUser());
  } catch (err) {
    dispatch({ type: LIKE_WOOF_FAIL });
  }
};

export const unLikeWoof = (id) => async (dispatch) => {
  try {
    dispatch({ type: UN_LIKE_WOOF });
    const { data } = await axios.get(`${API_BASE_URL}/woofs/${id}/unlike`);
    dispatch({ type: UN_LIKE_WOOF_SUCCESS, payload: { ...data, id } });
    dispatch(loadAuthUser());
  } catch (err) {
    dispatch({ type: UN_LIKE_WOOF_FAIL });
  }
};

export const addWoof = (woof) => async (dispatch) => {
  try {
    dispatch({ type: ADD_WOOF });
    const res = await axios.post(`${API_BASE_URL}/woofs`, woof);
    dispatch({ type: ADD_WOOF_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: ADD_WOOF_FAIL, payload: err.response.data });
  }
};

// export const clearWoofErrors = () => (dispatch) =>
//   dispatch({ type: CLEAR_WOOF_ERROR });

// export const clearWoof = () => (dispatch) => dispatch({ type: CLEAR_WOOF });
