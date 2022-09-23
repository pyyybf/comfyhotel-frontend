import userSlice from "./modules/user";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = [thunk];

export default createStore(
    combineReducers({
        userSlice
    }),
    composeWithDevTools(applyMiddleware(...middleware))
);