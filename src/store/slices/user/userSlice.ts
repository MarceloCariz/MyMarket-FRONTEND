import { createSlice } from '@reduxjs/toolkit';
import { UserProfileI } from '../../../interfaces/user';

export interface userStateI {
  profile: UserProfileI | null;
}

const initialState: userStateI = {
  profile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload.profile;
      return state;
    },
  },
});

export const { setUserProfile } = userSlice.actions;
