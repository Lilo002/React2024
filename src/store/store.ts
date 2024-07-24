import { configureStore } from '@reduxjs/toolkit/react';
import { pokemonApi } from './api/api';
import { flyout } from './flyout/flyoutSlice';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    flyout: flyout,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
