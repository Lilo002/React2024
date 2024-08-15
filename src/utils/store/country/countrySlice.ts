import { createSlice } from '@reduxjs/toolkit/react';
import { RootState } from '../store';
import { Countries } from '../../../constant/constant';

export const countrySlice = createSlice({
  name: 'country',
  initialState: Countries,
  reducers: {},
});

export const selectCount = (state: RootState) => state.users.values;
export default countrySlice.reducer;
