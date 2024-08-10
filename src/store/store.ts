import { Action, combineReducers, configureStore, PayloadAction } from '@reduxjs/toolkit/react';
import { pokemonApi } from './api/api';
import { flyout } from './flyout/flyoutSlice';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

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

export function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export interface RootState {
  [pokemonApi.reducerPath]: ReturnType<typeof pokemonApi.reducer>;
  flyout: ReturnType<typeof flyout>;
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
