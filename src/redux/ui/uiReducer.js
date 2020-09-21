import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_AUTH,
  LOAD_AUTH_SUCCESS,
  LOAD_AUTH_FAIL,
  CLEAR_UI_ERRORS,
  ADD_WOOF,
  ADD_WOOF_FAIL,
  ADD_WOOF_SUCCESS,
  MARK_NOTIFICATIONS_READ,
  MARK_NOTIFICATIONS_READ_SUCCESS,
  MARK_NOTIFICATIONS_READ_FAIL,
} from "../types";

const INITIAL_STATE = {
  loading: false,
  errors: null,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_AUTH:
    case LOGIN:
    case REGISTER:
    case ADD_WOOF:
    case MARK_NOTIFICATIONS_READ:
      return {
        ...state,
        loading: true,
      };

    case LOAD_AUTH_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case ADD_WOOF_SUCCESS:
    case MARK_NOTIFICATIONS_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case ADD_WOOF_FAIL:
    case MARK_NOTIFICATIONS_READ_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case LOAD_AUTH_FAIL:
      return {
        ...state,
        loading: false,
      };

    case CLEAR_UI_ERRORS:
      return {
        ...state,
        errors: null,
      };

    default:
      return state;
  }
};

export default uiReducer;
