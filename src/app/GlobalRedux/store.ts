'use client';
import { configureStore } from '@reduxjs/toolkit/react';
import { flyout } from './flyoutSlice/flyoutSlice';

export const store = configureStore({
  reducer: {
    flyout,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
