import { combineReducers } from 'redux';
import taskReducer from './TaskReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export default rootReducer;
