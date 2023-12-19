import React from 'react';



import {  applyMiddleware ,createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducers/TaskReducer';
const store = createStore(reducer,applyMiddleware(thunk));
export default store;