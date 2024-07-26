import { combineReducers, configureStore } from '@reduxjs/toolkit/react';
import { pokemonApi } from './api/api';
import { flyout } from './flyout/flyoutSlice';

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  flyout: flyout,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
