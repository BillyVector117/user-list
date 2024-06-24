import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  // otros reducers
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;