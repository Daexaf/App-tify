import { configureStore } from '@reduxjs/toolkit';
import TokenReducer from './reduxSlice';

export default configureStore({
  reducer: {
      token: TokenReducer
  }
});