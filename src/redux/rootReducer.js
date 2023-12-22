import { combineReducers } from 'redux';
import pageStateReducer from './pageState/pageStateReducer';
import middleFilterReducer from './middleFilter/middleFilterReducer';
import rightFilterReducer from './rightFilter/rightFilterReducer';

export const rootReducer = combineReducers({
  page: pageStateReducer,
  middleFilter: middleFilterReducer,
  rightFilter: rightFilterReducer,
})