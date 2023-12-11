import { combineReducers } from 'redux';
import pageStateReducer from './pageState/pageStateReducer';
import middleFilterReducer from './middleFilter/middleFilterReducer';

export const rootReducer = combineReducers({
  page: pageStateReducer,
  middleFilter: middleFilterReducer,
})