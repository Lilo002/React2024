import { configureStore } from '@reduxjs/toolkit/react';
import usersSlice from './users/usersSlice';
import countrySlice from './country/countrySlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    country: countrySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
