import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userSlice from '../features/user/userSlice';
import {useDispatch} from 'react-redux';

const middleware = [
  ...getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
  thunk,
];

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
