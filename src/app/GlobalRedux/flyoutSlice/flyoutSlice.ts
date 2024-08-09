'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../../types/types';

const flyoutSlice = createSlice({
  name: 'flyout',
  initialState: [] as Pokemon[],
  reducers: {
    addPokemon(state, action: PayloadAction<Pokemon>) {
      state.push(action.payload);
    },
    removePokemon(state, action: PayloadAction<Pokemon['name']>) {
      return state.filter((pokemon) => pokemon.name !== action.payload);
    },
    removeAll() {
      return [];
    },
  },
});

export const { addPokemon, removeAll, removePokemon } = flyoutSlice.actions;
export const flyout = flyoutSlice.reducer;
