import {
  LOAD_AUTH_SUCCESS,
  LOAD_AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  MARK_NOTIFICATIONS_READ_SUCCESS,
  MARK_NOTIFICATIONS_READ_FAIL,
} from "../types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: null,
  likes: [],
  notifications: [],
  errors: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
    case UPDATE_PROFILE:
      return { ...state, loading: true };

    case LOAD_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        errors: null,
        user: action.payload,
        notifications: action.payload.notifications,
        likes: action.payload.likes,
      };

    // case MARK_NOTIFICATIONS_READ_SUCCESS:
    //   return {
    //     ...state,
    //     notifications: state.notifications.map((not) => {
    //       return not.id === action.payload ? { ...not, read: true } : not;
    //     }),
    //     loading: false,
    //     errors: null,
    //   };

    case MARK_NOTIFICATIONS_READ_FAIL:
      return {
        ...state,
        loading: false,
      };

    case LOAD_AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        errors: action.payload,
      };

    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
