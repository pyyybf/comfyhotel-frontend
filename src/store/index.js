import userSlice from "./modules/user";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import hotelSlice from "./modules/hotel";

const middleware = [thunk];

export default createStore(
    combineReducers({
        userSlice,
        hotelSlice,
    }),
    composeWithDevTools(applyMiddleware(...middleware))
);