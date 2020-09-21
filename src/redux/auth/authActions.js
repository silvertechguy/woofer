import {
  LOAD_AUTH,
  LOAD_AUTH_SUCCESS,
  LOAD_AUTH_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  MARK_NOTIFICATIONS_READ,
  MARK_NOTIFICATIONS_READ_SUCCESS,
  MARK_NOTIFICATIONS_READ_FAIL,
} from "../types";

import axios from "axios";

import API_BASE_URL from "../../api/baseUrl";

export const loadAuthUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_AUTH });
    const res = await axios.get(`${API_BASE_URL}/auth/me`);
    dispatch({ type: LOAD_AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOAD_AUTH_FAIL });
  }
};

export const login = ({ ...userData }) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN });
    const res = await axios.post(`${API_BASE_URL}/auth/login`, { ...userData });
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadAuthUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data });
  }
};

export const register = ({ ...userData }) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER });
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
      ...userData,
    });
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadAuthUser());
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    await axios.get(`${API_BASE_URL}/auth/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL, payload: err.response.data });
  }
};

export const uploadImage = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE });
    await axios.put(`${API_BASE_URL}/users/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({ type: UPLOAD_IMAGE_SUCCESS });
    dispatch(loadAuthUser());
  } catch (err) {
    dispatch({ type: UPLOAD_IMAGE_FAIL, payload: err.response.data });
  }
};

export const updateProfile = (userDetails) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE });
    await axios.put(`${API_BASE_URL}/users`, userDetails);
    dispatch({ type: UPDATE_PROFILE_SUCCESS });
    dispatch(loadAuthUser());
  } catch (err) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.response.data });
  }
};

export const markNotificationsRead = (ids) => async (dispatch) => {
  try {
    dispatch({ type: MARK_NOTIFICATIONS_READ });
    await axios.put(`${API_BASE_URL}/notifications`, ids);
    dispatch({ type: MARK_NOTIFICATIONS_READ_SUCCESS, payload: ids });
    dispatch(loadAuthUser());
  } catch (err) {
    dispatch({ type: MARK_NOTIFICATIONS_READ_FAIL });
  }
};
