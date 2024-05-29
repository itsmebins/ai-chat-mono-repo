import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userReducer from './user/userSlice';
import { messageReducer } from './messageSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
