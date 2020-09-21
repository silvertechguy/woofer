import {
  USER_DETAILS,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_USER_DETAILS,
} from "../types";

const INITIAL_STATE = {
  userDetails: null,
  loading: false,
  errors: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        loading: false,
        errors: null,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
      };

    case CLEAR_USER_DETAILS:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default userReducer;
