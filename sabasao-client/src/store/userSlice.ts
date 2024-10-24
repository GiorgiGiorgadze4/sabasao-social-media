import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NullableIloggedUser } from "../interfaces/user";

interface UserState {
  user: NullableIloggedUser; // Allow null value for user
}

const initialState: UserState = {
  user: null, // Default to null when no user is logged in
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<NullableIloggedUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
