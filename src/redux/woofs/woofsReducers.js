import {
  LOAD_WOOFS,
  LOAD_WOOFS_SUCCESS,
  LOAD_WOOFS_FAIL,
  DELETE_WOOF,
  DELETE_WOOF_FAIL,
  DELETE_WOOF_SUCCESS,
  LIKE_WOOF,
  LIKE_WOOF_SUCCESS,
  LIKE_WOOF_FAIL,
  UN_LIKE_WOOF,
  UN_LIKE_WOOF_SUCCESS,
  UN_LIKE_WOOF_FAIL,
  ADD_WOOF_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  woofs: null,
  errors: null,
  loading: false,
};

const woofsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_WOOFS:
      return {
        ...state,
        loading: true,
      };

    case LOAD_WOOFS_SUCCESS:
      return {
        ...state,
        woofs: action.payload,
        loading: false,
        errors: null,
      };

    case LOAD_WOOFS_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case DELETE_WOOF:
      return {
        ...state,
      };

    case DELETE_WOOF_SUCCESS:
      return {
        ...state,
        woofs: state.woofs.filter((woof) => woof.id !== action.payload),
        errors: null,
      };

    case DELETE_WOOF_FAIL:
      return {
        ...state,
      };

    case LIKE_WOOF:
    case UN_LIKE_WOOF:
      return {
        ...state,
      };

    case LIKE_WOOF_SUCCESS:
    case UN_LIKE_WOOF_SUCCESS:
      return {
        ...state,
        woofs: state.woofs.map((woof) =>
          woof.id === action.payload.id ? { ...woof, ...action.payload } : woof
        ),
        loading: false,
        errors: null,
      };

    case LIKE_WOOF_FAIL:
    case UN_LIKE_WOOF_FAIL:
      return {
        ...state,
      };

    case ADD_WOOF_SUCCESS:
      return {
        ...state,
        loading: false,
        woofs: [action.payload, ...state.woofs],
        errors: null,
      };

    // case LOADING_WOOFS_FAIL:
    //   return { ...state, loadingUI: false, errors: payload };

    // case ADD_COMMENT_FAIL:
    //   return { ...state, loading: false, errors: payload };

    // case CLEAR_WOOF:
    //   return { ...state, woof: {}, loadingUI: true };

    // case CLEAR_WOOF_ERROR:
    //   return { ...state, errors: null };

    default:
      return state;
  }
};

export default woofsReducer;
