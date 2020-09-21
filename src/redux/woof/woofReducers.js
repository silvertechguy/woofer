import {
  LOAD_SINGLE_WOOF,
  LOAD_SINGLE_WOOF_SUCCESS,
  LOAD_SINGLE_WOOF_FAIL,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
} from "../types";

const INITIAL_STATE = {
  woof: null,
  errors: null,
  loading: false,
};

const woofReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SINGLE_WOOF:
    case ADD_COMMENT:
      return {
        ...state,
        loading: true,
      };

    case LOAD_SINGLE_WOOF_SUCCESS:
      return {
        ...state,
        loading: false,
        woof: action.payload,
        errors: null,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        woof: {
          ...state.woof,
          comments: [action.payload, ...state.woof.comments],
        },
        errors: null,
      };

    case LOAD_SINGLE_WOOF_FAIL:
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default woofReducer;
