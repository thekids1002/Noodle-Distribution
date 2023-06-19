import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import userSlice from '../features/user/userSlice';
import {useDispatch} from 'react-redux';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
