import { combineReducers } from "redux";
import pageStateReducer from "./pageState/pageStateReducer";
import filterReducer from "./filters/filterReducer";

export const rootReducer = combineReducers({
    page: pageStateReducer,
    filters: filterReducer,
});
