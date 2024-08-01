import { combineReducers, configureStore } from '@reduxjs/toolkit/react';
import { pokemonApi } from './api/api';
import { flyout } from './flyout/flyoutSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  flyout: flyout,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
