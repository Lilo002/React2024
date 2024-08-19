import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';
import { RootState } from '../store';
import { UserOnStore } from '../../../types';

const initialState: UserOnStore[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserOnStore>) => {
      state.push(action.payload);
    },
  },
});

export const { addUser } = usersSlice.actions;
export const selectCount = (state: RootState) => state.users.values;
export default usersSlice.reducer;
