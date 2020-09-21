import { combineReducers } from "redux";

import authReducer from "./auth/authReducers";
import woofReducer from "./woof/woofReducers";
import woofsReducer from "./woofs/woofsReducers";
import uiReducer from "./ui/uiReducer";
import userReducer from "./user/userReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  woof: woofReducer,
  woofs: woofsReducer,
  ui: uiReducer,
  user: userReducer,
});

export default rootReducer;
